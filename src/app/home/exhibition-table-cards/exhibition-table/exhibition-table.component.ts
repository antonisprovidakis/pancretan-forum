import { Component, Input, OnInit } from '@angular/core';

import { Product } from '../exhibition-product/product.interface';


@Component({
  selector: 'app-exhibition-table',
  templateUrl: './exhibition-table.component.html',
  styleUrls: ['./exhibition-table.component.scss']
})
export class ExhibitionTableComponent implements OnInit {
  @Input() producerID = 'uid';
  producerBrandName = 'Producer brand name goes here';

  products: Product[] = [];

  constructor() { }

  ngOnInit() {

    // mock data
    // const data: Product[] = [
    //   {
    //     title: 'a title',
    //     descr: 'a description',
    //     popularity: 23,
    //     comments: []
    //   },
    //   {
    //     title: 'a title',
    //     descr: 'a description',
    //     popularity: 23,
    //     comments: []
    //   },
    //   {
    //     title: 'a title',
    //     descr: 'a description',
    //     popularity: 23,
    //     comments: []
    //   }
    // ];

    // TODO: fetch products from firebase and for each product,
    // create and push a new object into this.products

    // data.forEach(product => {
    //   this.products.push(
    //     {
    //       title: product.title,
    //       descr: product.descr,
    //       popularity: product.popularity,
    //       comments: product.comments
    //     }
    //   );
    // });

  }

}
