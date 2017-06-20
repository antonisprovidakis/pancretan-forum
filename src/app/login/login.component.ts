import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public title: String = 'Pan-Cretan Forum';

  // 34 and 140 are gonna be dynamic from firebase
  public subTitle: String = '34 Hoteliers and 140 Producers of Crete gathered to make business';

  constructor() { }

  ngOnInit() {
  }

  loginGoogle() {
    // TODO: firebase auth
  }

}
