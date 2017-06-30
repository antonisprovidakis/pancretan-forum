import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-exhibition-table-card',
  templateUrl: './exhibition-table-card.component.html',
  styleUrls: ['./exhibition-table-card.component.scss']
})
export class ExhibitionTableCardComponent implements OnInit {
  @Input() likesCount = 0;
  @Input() image = '/assets/images/garg-farm.png';
  @Input() title = 'Garganourakis Farms';
  @Input() descr = 'Our farms produce the best cheese on Crete';

  constructor() { }

  ngOnInit() {
  }

  seeProducts() {
    // navigate to table, according to uid (check firebase)
  }
}
