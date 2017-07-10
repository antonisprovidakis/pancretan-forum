import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { ExhibitionTableData } from './exhibition-table-card/exhibition-table-data.interface';

@Component({
  selector: 'app-exhibition-table-cards',
  templateUrl: './exhibition-table-cards.component.html',
  styleUrls: ['./exhibition-table-cards.component.scss']
})
export class ExhibitionTableCardsComponent implements OnInit, OnChanges {
  @Input() producerIDs: string[] = ['uid1', 'uid2'];

  tables: ExhibitionTableData[] = [];

  constructor() {

  }

  ngOnInit() {
  }

  // runs whenever input properties change
  ngOnChanges(changes: SimpleChanges): void {
    const newProducerIDs = changes.producerIDs.currentValue;

    newProducerIDs.forEach(producerUID => {

      // TODO: for every producerUID fetch data, create a table object and push it into this.tables

      this.tables.push(
        {
          producerName: 'Gargan farm',
          descr: 'Some descra15dsa4d5',
          logo: '/assets/images/garg-farm.png',
          popularity: 6
        }
      );
    });

  }

}
