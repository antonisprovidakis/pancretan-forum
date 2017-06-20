import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exhibition-product',
  templateUrl: './exhibition-product.component.html',
  styleUrls: ['./exhibition-product.component.css']
})
export class ExhibitionProductComponent implements OnInit {

  liked = true;
  likesCount = 8;

  constructor() { }

  ngOnInit() {
  }

}
