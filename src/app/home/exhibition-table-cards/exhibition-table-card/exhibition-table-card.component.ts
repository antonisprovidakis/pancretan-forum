import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exhibition-table-card',
  templateUrl: './exhibition-table-card.component.html',
  styleUrls: ['./exhibition-table-card.component.scss']
})
export class ExhibitionTableCardComponent implements OnInit {
  @Input() uid: string;
  @Input() popularity = 0;
  @Input() logo: string;
  @Input() producerName: string;
  @Input() descr: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  seeProducts() {
    this.router.navigate(['/exhibition-table', this.uid]);
  }
}
