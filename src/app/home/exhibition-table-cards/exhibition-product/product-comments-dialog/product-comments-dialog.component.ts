import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-product-comments-dialog',
  templateUrl: './product-comments-dialog.component.html',
  styleUrls: ['./product-comments-dialog.component.scss']
})

export class ProductCommentsDialogComponent {
  constructor(
    @Inject(MD_DIALOG_DATA) public data: any) { }
}
