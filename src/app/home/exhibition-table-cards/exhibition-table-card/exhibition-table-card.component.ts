import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-exhibition-table-card',
  templateUrl: './exhibition-table-card.component.html',
  styleUrls: ['./exhibition-table-card.component.scss']
})
export class ExhibitionTableCardComponent implements OnInit {
  @Input() popularity = 0;
  @Input() logo: string;
  @Input() producerName: string;
  @Input() descr: string;
  constructor() { }

  ngOnInit() {
  }

  seeProducts() {
    // TODO: navigate to table, according to uid (check firebase)
  }
}
