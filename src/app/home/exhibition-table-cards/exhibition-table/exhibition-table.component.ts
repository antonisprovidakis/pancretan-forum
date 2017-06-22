import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exhibition-table',
  templateUrl: './exhibition-table.component.html',
  styleUrls: ['./exhibition-table.component.css']
})
export class ExhibitionTableComponent implements OnInit {

  producerBrandName = 'Garganourakis Farm';


  constructor() { }

  ngOnInit() {
  }

}
