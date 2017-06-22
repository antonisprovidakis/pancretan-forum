import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitionTableCardsComponent } from './exhibition-table-cards.component';

describe('ExhibitionTableCardsComponent', () => {
  let component: ExhibitionTableCardsComponent;
  let fixture: ComponentFixture<ExhibitionTableCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExhibitionTableCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhibitionTableCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
