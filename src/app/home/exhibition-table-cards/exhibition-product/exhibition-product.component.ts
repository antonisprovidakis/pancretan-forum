import { Component, Input, Inject, OnInit } from '@angular/core';
import { MdDialog, MD_DIALOG_DATA } from '@angular/material';

import { Comment } from './comment.interface';
import { ProductCommentsDialogComponent } from './product-comments-dialog/product-comments-dialog.component';

@Component({
  selector: 'app-exhibition-product',
  templateUrl: './exhibition-product.component.html',
  styleUrls: ['./exhibition-product.component.scss']
})
export class ExhibitionProductComponent implements OnInit {
  @Input() producerName = 'Garganourakis Farms';
  @Input() liked = false;
  // TODO: should "liked" be an Output also?
  @Input() likesCount = 0;
  @Input() image = '/assets/images/feta.jpg';
  @Input() title = 'Feta';
  @Input() descr = 'Best feta in the world';
  @Input() comments: Comment[] = [
    {
      'user': 'SoLmAgNiYuWLBt9pb395PVrPon72',
      'content': 'Guys, this is really good.'
    },
    {
      'user': 'kmVxL0UGK2e6xbs698FUvtQVHeR2',
      'content': 'Should I buy?'
    },
    {
      'user': 'SoLmAgNiYuWLBt9pb395PVrPon72',
      'content': 'Absolutely, yes!'
    }
  ];

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
      this.likesCount++;
    } else {
      this.likesCount--;
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
