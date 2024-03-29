import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/take';

import * as Vis from 'vis';

import { DatabaseApiService } from '../shared/database-api.service';


@Component({
  selector: 'app-forum-status',
  templateUrl: './forum-status.component.html',
  styleUrls: ['./forum-status.component.scss']
})
export class ForumStatusComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public doughnutChartLabels: string[] = ['Deals', 'No Deals'];
  private deals = 0;
  private noDeals = 0;
  public doughnutChartData: number[] = [1, 1];
  public doughnutChartType = 'doughnut';

  public popularThemesData: Array<any> = [
    { text: '', weight: 3 },
    // { text: 'meat', weight: 5 },
  ];

  private tempList: any[] = [];

  private nodes: any[] = [
    { id: 1, shape: 'ellipse', label: 'PanCretan Forum' },
    { id: 2, shape: 'circle', label: 'Hoteliers', color: { border: 'blue' } },
    { id: 3, shape: 'circle', label: 'Producers', color: { border: 'green' } },
  ];

  private edges: any[] = [
    { from: 1, to: 2 },
    { from: 1, to: 3 }
  ];

  constructor(private dbApi: DatabaseApiService) { }

  ngOnInit() {
    this.dbApi.getCompletedMeetings()
      .takeUntil(this.ngUnsubscribe).subscribe(meetings => {

        let allTags: string[] = [];

        for (const meeting of meetings) {
          if (meeting.emergent_themes) {
            const emergentThemesValues = Object.keys(meeting.emergent_themes).map(key => meeting.emergent_themes[key]);
            allTags = allTags.concat(emergentThemesValues);
          }

          if (meeting.common_interests) {
            const commonInterestsValues = Object.keys(meeting.common_interests).map(key => meeting.common_interests[key]);
            allTags = allTags.concat(commonInterestsValues);
          }

          this.setupPopularThemesData(allTags);

          if (meeting.deal) {
            this.deals++;
          } else {
            this.noDeals++;
          }
        }

        this.doughnutChartData = [this.noDeals, this.deals];

        this.popularThemesData = [
          { text: '', weight: 3 },
        ]
        this.popularThemesData = this.popularThemesData.concat(this.tempList);
      });

    Observable.forkJoin(
      this.dbApi.getHoteliers().take(1),
      this.dbApi.getProducers().take(1)
    ).subscribe(data => {
      const hoteliers = data[0];
      const producers = data[1];

      const hoteliersNodes = [];
      const producersNodes = [];

      hoteliers.forEach(hotelier => {
        hoteliersNodes.push({
          id: hotelier.$key,
          shape: 'circularImage',
          image: hotelier.company.logo,
          label: hotelier.company.name
        });
      });

      producers.forEach(producer => {
        producersNodes.push({
          id: producer.$key,
          shape: 'circularImage',
          image: producer.company.logo,
          label: producer.company.name
        });
      });

      this.nodes = this.nodes.concat(producersNodes);
      this.nodes = this.nodes.concat(hoteliersNodes);

      this.edges = this.edges.concat(
        this.setupEdges(producersNodes, hoteliersNodes));

      const container = document.getElementById('communityNetwork');

      const netData = {
        nodes: this.nodes,
        edges: this.edges
      };

      const options = {
        autoResize: true,
        height: '300px',
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
          color: 'lightgray',
          length: 150,
          width: 3
        }
      };

      const communityNetwork = new Vis.Network(container, netData, options);
    });

  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private setupPopularThemesData(tags) {
    this.tempList = [];

    for (const tag of tags) {
      // check if the current tag is already in the list
      // const index = this.popularThemesData.findIndex(value => value.text === tag);
      const index = this.tempList.findIndex(value => value.text === tag);

      if (index > -1) {
        this.tempList[index].weight += 5;
      } else {
        this.tempList.push({
          text: tag,
          weight: 3
        });
      }
    }
  }

  // private setupCommonInterestsData(commonInterests) {

  //   for (const interest of commonInterests) {
  //     // check if the current interest is already in the list
  //     const index = this.commonInterestsList.findIndex(value => value.text === interest);

  //     if (index > -1) {
  //       this.commonInterestsList[index].weight += 5;
  //     } else {
  //       this.commonInterestsList.push({
  //         text: interest,
  //         weight: 3
  //       });
  //     }
  //   }
  // }

  // private setupEmergentThemesData(emergentThemes) {

  //   for (const emergentThema of emergentThemes) {

  //     // check if the current emergentThema is already in the list
  //     const index = this.emergentThemesList.findIndex(value => value.text === emergentThema);

  //     if (index > -1) {
  //       this.emergentThemesList[index].weight += 5;
  //     } else {
  //       this.emergentThemesList.push({
  //         text: emergentThema,
  //         weight: 5
  //       });
  //     }
  //   }
  // }

  private setupEdges(producers, hoteliers): any[] {
    const edges = [];

    for (const producer of producers) {
      edges.push({
        from: 3, to: producer.id
      });
    }

    for (const hotelier of hoteliers) {
      edges.push({
        from: 2, to: hotelier.id
      });
    }
    return edges;
  }
}
