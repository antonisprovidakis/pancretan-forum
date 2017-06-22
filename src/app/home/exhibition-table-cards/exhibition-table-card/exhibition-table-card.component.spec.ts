import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitionTableCardComponent } from './exhibition-table-card.component';

describe('ExhibitionTableCardComponent', () => {
  let component: ExhibitionTableCardComponent;
  let fixture: ComponentFixture<ExhibitionTableCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExhibitionTableCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhibitionTableCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
