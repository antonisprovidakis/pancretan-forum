import { Component, OnInit, OnDestroy } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Subject } from 'rxjs/Subject';

import * as Vis from 'vis';

const MEETINGS_PATH = '/meetings';
const USERS_PATH = '/users';

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
    // { text: 'meat', weight: 5 },
  ]

  private commonInterestsList: any[] = [];
  private emergentThemesList: any[] = [];

  private nodes: any[] = [
    { id: 1, shape: 'ellipse', label: 'PanCretan Forum' },
    { id: 2, shape: 'circle', label: 'Hoteliers', color: { border: 'blue' } },
    { id: 3, shape: 'circle', label: 'Producers', color: { border: 'green' } },
  ];

  private edges: any[] = [
    { from: 1, to: 2 },
    { from: 1, to: 3 }
  ];
  private idCounter: number = 3;
  private producers: any[] = [];
  private hoteliers: any[] = [];

  constructor(public db: AngularFireDatabase) { }

  ngOnInit() {

    this.db.list(MEETINGS_PATH, {
      query: {
        orderByChild: 'state',
        equalTo: 'completed'
      }
    })
      .takeUntil(this.ngUnsubscribe).subscribe(meetings => {

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

    this.db.list(USERS_PATH).takeUntil(this.ngUnsubscribe)
      .subscribe(users => {

        console.log('users', users);

        for (let user of users) {
          this.idCounter++;

          if (user.role === 'producer') {
            this.producers.push({
              id: this.idCounter,
              shape: 'circularImage',
              image: user.photoURL,
              label: user.name
            });
          } else if (user.role === 'hotelier') {
            this.hoteliers.push({
              id: this.idCounter,
              shape: 'circularImage',
              image: user.photoURL,
              label: user.name
            });
          }
        }

        this.nodes = this.nodes.concat(this.producers);
        this.nodes = this.nodes.concat(this.hoteliers);

        this.edges = this.edges.concat(
          this.setupEdges(this.producers, this.hoteliers));

        const container = document.getElementById('usersContainer');

        const data = {
          nodes: this.nodes,
          edges: this.edges
        };

        const options = {
          autoResize: true,
          // height: '100%',
          // width: '100%',
          nodes: {
            borderWidth: 2,
            size: 30,
            color: {
              border: '#152d52',
              background: '#fff'
            },
            font: { size: 18, color: '#000' }
          },
          edges: {
            color: 'lightgray'
          },
          phisics:{stabilization:{ fit: true}}
        };

        let network = new Vis.Network(container, data, options);
        // network.fit();
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

  private setupEdges(producers, hoteliers): any[] {
    let edges = [];

    for (let producer of producers) {
      edges.push({
        from: 3, to: producer.id
      });
    }

    for (let hotelier of hoteliers) {
      edges.push({
        from: 2, to: hotelier.id
      });
    }
    return edges;
  }
}
