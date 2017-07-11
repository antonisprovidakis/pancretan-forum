import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {

  selectedRole = 'hotelier';

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
  }

}
