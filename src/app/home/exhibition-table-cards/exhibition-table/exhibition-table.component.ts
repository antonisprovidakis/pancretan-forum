import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exhibition-table',
  templateUrl: './exhibition-table.component.html',
  styleUrls: ['./exhibition-table.component.scss']
})
export class ExhibitionTableComponent implements OnInit {

  producerBrandName = 'Garganourakis Farm';


  constructor() { }

  ngOnInit() {
  }

}
