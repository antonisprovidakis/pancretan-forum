import { Component, Input, Inject, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { Comment } from './comment.interface';
import { ProductCommentsDialogComponent } from './product-comments-dialog/product-comments-dialog.component';

@Component({
  selector: 'app-exhibition-product',
  templateUrl: './exhibition-product.component.html',
  styleUrls: ['./exhibition-product.component.scss']
})
export class ExhibitionProductComponent implements OnInit {
  @Input() liked = false;
  // TODO: should "liked" be an Output also?
  @Input() popularity;
  @Input() image;
  @Input() title;
  @Input() descr;
  @Input() comments: Comment[];

  private dialogConfig = {
    disableClose: false,
    // panelClass: 'custom-overlay-pane-class',
    panelClass: '',
    hasBackdrop: true,
    backdropClass: '',
    width: '500px',
    height: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    },
    data: {
      title: '',
      comments: []
    }
  };

  constructor(public dialog: MdDialog) { }

  ngOnInit() {
  }

  like(liked) {
    this.liked = liked;

    if (liked) {
      this.popularity++;
    } else {
      this.popularity--;
    }

    // TODO: Somehow firebase record for this product must be updated
  }

  openCommentsDialog() {
    this.dialogConfig.data = {
      title: this.title,
      comments: this.comments
    }

    this.dialog.open(ProductCommentsDialogComponent, this.dialogConfig);
  }
}
