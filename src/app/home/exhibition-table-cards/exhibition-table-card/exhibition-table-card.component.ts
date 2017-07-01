import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-exhibition-table-card',
  templateUrl: './exhibition-table-card.component.html',
  styleUrls: ['./exhibition-table-card.component.scss']
})
export class ExhibitionTableCardComponent implements OnInit {
  @Input() popularity = 0;
  @Input() image = '/assets/images/garg-farm.png';
  @Input() producerName = 'Garganourakis Farms';
  @Input() descr = 'Our farms produce the best cheese on Crete';

  constructor() { }

  ngOnInit() {
  }

  seeProducts() {
    // TODO: navigate to table, according to uid (check firebase)
  }
}
