import { Component, OnInit } from '@angular/core';

import { MdSnackBar } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeUntil';


import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

import { AuthenticationService } from '../shared/authentication.service';

const LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';
const PROFILE_PLACEHOLDER_IMAGE_URL = '/assets/images/profile_placeholder.png';

@Component({
  selector: 'app-negotiations-table',
  templateUrl: './negotiations-table.component.html',
  styleUrls: ['./negotiations-table.component.scss']
})
export class NegotiationsTableComponent implements OnInit {
  // private ngUnsubscribe: Subject<void> = new Subject<void>();

  messages: FirebaseListObservable<any>;
  messageValue = '';

  commonInterests: string[] = ['abc', 'def', 'def'];
  emergentThemes: string[] = ['123', '456', '789'];

  constructor(
    public authService: AuthenticationService,
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public snackBar: MdSnackBar
  ) { }

  ngOnInit() {

    this.authService.getCurrentUser().subscribe((authData) => {
      if (authData) {
        this.messages = this.db.list('/messages', {
          query: {
            limitToLast: 12
          }
        });

        this.messages.subscribe((messages) => {
          // Make sure new message scroll into view
          setTimeout(() => {
            const messageList = document.getElementById('messagesContainer');
            messageList.scrollTop = messageList.scrollHeight;
            document.getElementById('messageInput').focus();
          }, 500);
        });

      }
    });
  }

  exit() {
  }

  addEmergentTheme(input: HTMLInputElement, destContainer: HTMLDivElement): void {
    if (input.value && input.value.trim() !== '') {
      // trim, replace space with underscore, convert to lowecase
      const tag = input.value.trim().replace(/\s+/g, '_').toLowerCase();

      if (!this.emergentThemes.includes(tag)) {
        this.emergentThemes.push(tag);
        destContainer.scrollTop = destContainer.scrollHeight;
        input.value = '';
      } else {
        this.snackBar.open('Tag already in list', null, {
          duration: 2000
        });
      }
    }

  }

  removeTag(el): void {
    const tag = el.innerHTML;
    this.emergentThemes.splice(this.emergentThemes.indexOf(tag), 1);
  }

  saveMessage() {
    if (this.messageValue && this.authService.isAuthenticated()) {
      // Add a new message entry to the Firebase Database.
      const messages = this.db.list('/messages');
      messages.push({
        name: this.authService.getDisplayName(),
        text: this.messageValue,
        photoUrl: this.authService.getPhotoURL()
      }).then(() => {
        // Clear message text field and SEND button state.
        this.messageValue = '';
        // el.value = '';
      }).catch((err) => {
        this.snackBar.open('Error writing new message to Firebase Database.', null, {
          duration: 5000
        });
        console.error(err);
      });
    }
  }

  // update(value: string) {
  //   this.value = value;
  // }

  saveImageMessage(event: any) {
    event.preventDefault();
    const file = event.target.files[0];

    // Clear the selection in the file picker input.
    // const imageForm = <HTMLFormElement>document.getElementById('image-form');
    // imageForm.reset();

    event.target.value = '';

    // Check if the file is an image.
    if (!file.type.match('image.*')) {
      this.snackBar.open('You can only share images', null, {
        duration: 5000
      });
      return;
    }

    // Check if the user is signed-in
    if (this.authService.isAuthenticated()) {

      // We add a message with a loading icon that will get updated with the shared image.
      const messages = this.db.list('/messages');
      messages.push({
        name: this.authService.getDisplayName(),
        imageUrl: LOADING_IMAGE_URL,
        photoUrl: this.authService.getPhotoURL()
      }).then((data) => {
        // Upload the image to Cloud Storage.
        const filePath = `${this.authService.getUID()}/${data.key}/${file.name}`;
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
    // event.preventDefault();
    document.getElementById('mediaCapture').click();
  }

  deal() {
  }

  noDeal() {
  }
}
