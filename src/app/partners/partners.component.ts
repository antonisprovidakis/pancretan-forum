import { Component, OnInit } from '@angular/core';

import {  FirebaseListObservable } from 'angularfire2/database';

import { DatabaseApiService } from '../shared/database-api.service';

declare var $: any;

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {

  hotels:FirebaseListObservable<any>;
  producers: FirebaseListObservable<any>;
  constructor(private dbApi: DatabaseApiService) { }

  ngOnInit() {


    this.hotels = this.dbApi.getHoteliers();

  this.producers = this.dbApi.getProducers();
  }

}
