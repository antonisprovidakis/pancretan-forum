import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {


  peopleData = [
    {
      brandName: 'Garganourakis Farm',
      stars: 5
    },
    {
      brandName: 'Maridakis Butchery Shop',
      stars: 3
    }
  ];

  constructor() { }

  ngOnInit() {
    this.setupUI();
  }

  private setupUI() {
    $('.ui.dropdown').dropdown();
    // $('.ui.rating').rating();

  }

}
