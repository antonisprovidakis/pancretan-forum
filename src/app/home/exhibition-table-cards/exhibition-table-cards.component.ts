import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { ExhibitionTableData } from './exhibition-table-card/exhibition-table-data.interface';

@Component({
  selector: 'app-exhibition-table-cards',
  templateUrl: './exhibition-table-cards.component.html',
  styleUrls: ['./exhibition-table-cards.component.scss']
})
export class ExhibitionTableCardsComponent implements OnInit {
  @Input() producers: any[];

  // tables: ExhibitionTableData[] = [];

  constructor() {

  }

  ngOnInit() {
  }

  // runs whenever input properties change
  // ngOnChanges(changes: SimpleChanges): void {
  //   const newProducers = changes.producers.currentValue;

  //   newProducers.forEach(producer => {

  //     const producerTable: any[] = producer.company;

  //     // TODO: for every producer fetch data, create a table object and push it into this.tables

  //     this.tables.push(
  //       {
  //         producerName: 'Gargan farm',
  //         descr: 'Some descra15dsa4d5',
  //         logo: '/assets/images/garg-farm.png',
  //         popularity: 6
  //       }
  //     );
  //   });
  // }

}
