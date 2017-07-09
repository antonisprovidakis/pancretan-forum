import { Component, OnInit, OnDestroy } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Subject } from 'rxjs/Subject';

const MEETINGS_PATH = '/meetings';

@Component({
  selector: 'app-forum-status',
  templateUrl: './forum-status.component.html',
  styleUrls: ['./forum-status.component.scss']
})
export class ForumStatusComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public doughnutChartLabels: string[] = ['Deals', 'No Deals'];
  private deals: number = 0;
  private noDeals: number = 0;
  public doughnutChartData: number[] = [1, 1];
  public doughnutChartType: string = 'doughnut';

  public data: Array<any> = [
    { text: '', weight: 3 },
    { text: 'meat', weight: 5 },
    { text: 'pork ', weight: 6 },
    { text: 'checken', weight: 7 },
    { text: 'maroulia', weight: 8 },
    { text: 'vegeteria', weight: 4 }
    // ...
  ]

  private commonInterestsList: any[] = [];
  private emergentThemesList: any[] = [];
  constructor(public db: AngularFireDatabase) { }

  ngOnInit() {

    this.db.list(MEETINGS_PATH, {
      query: {
        orderByChild: 'completed',
        equalTo: true
      }
    }).takeUntil(this.ngUnsubscribe).subscribe(meetings => {

      for (let meeting of meetings) {

        this.setupEmergentThemesData(meeting.emergent_themes);
        this.setupCommonInterestsData(meeting.common_interests);

        if (meeting.deal) {
          this.deals++;
        } else {
          this.noDeals++;
        }
      }
      this.doughnutChartData = [this.noDeals, this.deals];

      this.data = this.data.concat(this.emergentThemesList);
      this.data = this.data.concat(this.commonInterestsList);
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private setupCommonInterestsData(commonInterests) {

    for (let interest of commonInterests) {
      //check if the current interest is already in the list
      let index = this.commonInterestsList.findIndex(value => value.text === interest);
      if (index > -1) {
        this.commonInterestsList[index].weight += 5;
      } else {
        this.commonInterestsList.push({
          text: interest,
          weight: 3
        });
      }

    }

  }

  private setupEmergentThemesData(emergentThemes) {

    for (let emergentThema of emergentThemes) {
      //check if the current emergentThema is already in the list
      let index = this.emergentThemesList.findIndex(value => value.text === emergentThema);

      if (index > -1) {
        this.emergentThemesList[index].weight += 5;
      } else {
        this.emergentThemesList.push({
          text: emergentThema,
          weight: 5
        });
      }

    }

  }

}
