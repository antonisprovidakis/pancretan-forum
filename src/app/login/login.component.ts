import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'Pan-Cretan Forum';

  // dynamic values from firebase
  numOfHoteliers = 34;
  numOfProducers = 140;

  constructor() { }

  ngOnInit() {
  }

  loginGoogle() {
    // TODO: firebase auth
  }

}
