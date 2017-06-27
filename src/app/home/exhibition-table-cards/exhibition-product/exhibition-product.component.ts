import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-exhibition-product',
  templateUrl: './exhibition-product.component.html',
  styleUrls: ['./exhibition-product.component.scss']
})
export class ExhibitionProductComponent implements OnInit {

  @Input() liked = false;
  @Input() likesCount = 0;
  @Input() image: string;
  @Input() title: string;
  @Input() descr: string;

  constructor() { }

  ngOnInit() {
  }

  like(liked) {
    this.liked = liked;

    if (liked) {
      this.likesCount++;
    } else {
      this.likesCount--;
    }
  }

}
