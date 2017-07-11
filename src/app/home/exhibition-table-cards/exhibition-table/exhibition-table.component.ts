import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import 'rxjs/add/operator/take';

import { ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../../shared/authentication.service';
import { DatabaseApiService } from '../../../shared/database-api.service';

import { Product } from '../exhibition-product/product.interface';


@Component({
  selector: 'app-exhibition-table',
  templateUrl: './exhibition-table.component.html',
  styleUrls: ['./exhibition-table.component.scss']
})
export class ExhibitionTableComponent implements OnInit, OnDestroy {
  // producerID: string;
  producerBrandName: string;
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    public authService: AuthenticationService,
    private dbApi: DatabaseApiService
  ) { }

  ngOnInit() {
    this.route.params.take(1).subscribe(params => {
      const producerUID = params.id;

      this.dbApi.getProducerCompany(producerUID).subscribe(company => {
        this.producerBrandName = company.name;
        this.products = company.exhibition_table;
      });

    });


    // mock data
    // const data: Product[] = [
    //   {
    //     title: 'a title',
    //     descr: 'a description',
    //     popularity: 23,
    //     comments: [],
    //     image: '/assets/images/feta.jpg'
    //   },
    //   {
    //     title: 'a title',
    //     descr: 'a description',
    //     popularity: 23,
    //     comments: [],
    //     image: '/assets/images/graviera.jpg'
    //   },
    //   {
    //     title: 'a title',
    //     descr: 'a description',
    //     popularity: 23,
    //     comments: [],
    //     image: '/assets/images/feta.jpg'
    //   },
    //   {
    //     title: 'a title',
    //     descr: 'a description',
    //     popularity: 23,
    //     comments: [],
    //     image: '/assets/images/graviera.jpg'
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
    //       comments: product.comments,
    //       image: product.image
    //     }
    //   );
    // });

  }

  ngOnDestroy(): void {
  }

}
