import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MdDialog, MD_DIALOG_DATA } from '@angular/material';

import { MdSnackBar } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeUntil';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

import { AuthenticationService } from '../shared/authentication.service';
import { DatabaseApiService } from '../shared/database-api.service';

const LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';

const MEETINGS_PATH = '/meetings';

@Component({
  selector: 'app-negotiations-table',
  templateUrl: './negotiations-table.component.html',
  styleUrls: ['./negotiations-table.component.scss']
})
export class NegotiationsTableComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  // private MEETING_ID = 'kmVxL0UGK2e6xbs698FUvtQVHeR2_SoLmAgNiYuWLBt9pb395PVrPon72_1499439600000';
  MEETING_ID: string;
  role: string;
  private userTypingTimer: any;

  messages: FirebaseListObservable<any>;
  messageValue = '';

  commonInterests: FirebaseListObservable<string[]>;
  emergentThemes: FirebaseListObservable<string[]>;

  hotelier: any;
  producer: any;

  private myRoleRef: FirebaseObjectObservable<any>;
  private oppositeRoleObject: any;

  private hotelierRef: FirebaseObjectObservable<any>;
  private producerRef: FirebaseObjectObservable<any>;

  dealt: boolean;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public authService: AuthenticationService,
    public db: AngularFireDatabase,
    private dbApi: DatabaseApiService,
    public afAuth: AngularFireAuth,
    public snackBar: MdSnackBar,
    public dialog: MdDialog
  ) {
    this.MEETING_ID = data.meetingID;
    this.role = data.role;
  }

  onCheckDeal(dealEvent) {
    this.dealt = dealEvent.checked;
  }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((authData) => {
      if (authData) {
        this.hotelierRef = this.db.object(MEETINGS_PATH + '/' + this.MEETING_ID + '/' + 'hotelier');

        this.hotelierRef.subscribe(hotelier => {
          this.hotelier = hotelier;
        });

        this.producerRef = this.db.object(MEETINGS_PATH + '/' + this.MEETING_ID + '/' + 'producer');
        this.producerRef.subscribe(producer => {
          this.producer = producer;
        });

        this.myRoleRef = this.getAppropriateRoleRef(this.role);

        this.goOnline();

        this.messages = this.db.list(MEETINGS_PATH + '/' + this.MEETING_ID + '/messages', {
          query: {
            limitToLast: 12
          }
        });

        this.messages.takeUntil(this.ngUnsubscribe).subscribe((messages) => {
          setTimeout(() => {
            const messageList = document.getElementById('messagesContainer');
            messageList.scrollTop = messageList.scrollHeight;
            document.getElementById('messageInput').focus();
          }, 500);
        });

        this.commonInterests = this.db.list(MEETINGS_PATH + '/' + this.MEETING_ID + '/common_interests');

        this.emergentThemes = this.db.list(MEETINGS_PATH + '/' + this.MEETING_ID + '/emergent_themes');
        this.emergentThemes.takeUntil(this.ngUnsubscribe).subscribe((emergentThemes) => {
          setTimeout(() => {
            const emergentThemesContainer = document.getElementById('emergentThemesContainer');
            emergentThemesContainer.scrollTop = emergentThemesContainer.scrollHeight;
          }, 200);
        });

      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private getAppropriateRoleRef(role: string) {
    return role === 'hotelier' ? this.hotelierRef : this.producerRef;
  }

  private getOppositeRoleObject(role: string) {
    return role === 'hotelier' ? this.producer : this.hotelier;
  }

  private goOnline() {
    return this.myRoleRef.update({ online: true });
  }

  private goOffline() {
    return this.myRoleRef.update({ online: false });
  }

  exit() {
    if (this.dealt !== undefined) {

      this.myRoleRef.update({ deal: this.dealt }).then(() => {
        const myVote = this.dealt;
        const otherVote = this.getOppositeRoleObject(this.role).deal;

        if (myVote !== undefined && otherVote !== undefined) {
          const meetingDeal = myVote && otherVote ? true : false;
          // this.updateMeetingDealValue(meetingDeal);
          this.dbApi.updateMeetingDeal(this.MEETING_ID, meetingDeal);

          this.dbApi.updateMeetingState(this.MEETING_ID, 'completed')
          // this.updateMeetingCompletedValue(true);
        }
      });
    }

    this.goOffline()
    this.dialog.closeAll();
  }

  // private updateMeetingCompletedValue(completed) {
  //   const pendingMeeting = this.db.object(MEETINGS_PATH + '/' + this.MEETING_ID);
  //   pendingMeeting.update({ completed: completed });
  // }

  // private updateMeetingDealValue(deal: boolean) {
  //   const pendingMeeting = this.db.object(MEETINGS_PATH + '/' + this.MEETING_ID);
  //   pendingMeeting.update({ deal: deal });
  // }

  deal() {
    this.dealt = true;
  }

  noDeal() {
    this.dealt = false;
  }

  setUserTyping() {
    this.myRoleRef.update({ typing: true });

    if (this.userTypingTimer) {
      clearTimeout(this.userTypingTimer);
    }

    this.userTypingTimer = setTimeout(() => this.myRoleRef.update({ typing: false }), 2000);
  }

  addEmergentTheme(input: HTMLInputElement, destContainer: HTMLDivElement): void {
    if (input.value && input.value.trim() !== '') {
      // trim, replace space with underscore, convert to lowercase
      const tag = input.value.trim().replace(/\s+/g, '_').toLowerCase();

      // make sure there are no duplicates
      this.emergentThemes.map(data => {
        const themesValues = [];

        data.forEach(themeObject => {
          themesValues.push(themeObject.$value);
        });

        return themesValues;
      }).take(1).subscribe(emergentThemesValues => {
        if (!emergentThemesValues.includes(tag)) {
          this.emergentThemes.push(tag);
          input.value = '';
        } else {
          this.snackBar.open('Tag already in list', null, {
            duration: 2000
          });
        }
      });
    }
  }

  removeTag(key: string): void {
    this.emergentThemes.remove(key);
  }

  saveMessage() {
    if (this.messageValue && this.authService.isAuthenticated()) {
      // Add a new message entry to the Firebase Database.
      this.messages.push({
        name: this.authService.getDisplayName(),
        text: this.messageValue,
        photoUrl: this.authService.getPhotoURL()
      }).then(() => {
        this.messageValue = '';
      }).catch((err) => {
        this.snackBar.open('Error writing new message to Firebase Database.', null, {
          duration: 5000
        });
        console.error(err);
      });
    }
  }

  saveImageMessage(event: any) {
    event.preventDefault();
    const file = event.target.files[0];

    event.target.value = '';

    // Check if the file is an image.
    if (!file.type.match('image.*')) {
      this.snackBar.open('You can only share images', null, {
        duration: 5000
      });
      return;
    }

    if (this.authService.isAuthenticated()) {

      // We add a message with a loading icon that will get updated with the shared image.
      this.messages.push({
        name: this.authService.getDisplayName(),
        imageUrl: LOADING_IMAGE_URL,
        photoUrl: this.authService.getPhotoURL()
      }).then((data) => {
        // Upload the image to Cloud Storage.
        const filePath = `meetings/${this.MEETING_ID}/${this.authService.getUID()}/${data.key}/${file.name}`;
        return firebase.storage().ref(filePath).put(file)
          .then((snapshot) => {
            // Get the file's Storage URI and update the chat message placeholder.
            const fullPath = snapshot.metadata.fullPath;
            const imageUrl = firebase.storage().ref(fullPath).toString();
            return firebase.storage().refFromURL(imageUrl).getMetadata();
          }).then((metadata) => {
            // TODO: Instead of saving the download URL, save the GCS URI and
            //       dynamically load the download URL when displaying the image
            //       message.
            return data.update({
              imageUrl: metadata.downloadURLs[0]
            });
          });
      }).catch((err) => {
        this.snackBar.open('There was an error uploading a file to Cloud Storage.', null, {
          duration: 5000
        });
        console.error(err);
      });
    }
  }

  // TODO: Refactor into image message form component
  onImageClick() {
    document.getElementById('imageInput').click();
  }

}
