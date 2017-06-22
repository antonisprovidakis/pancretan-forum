import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitionTableComponent } from './exhibition-table.component';

describe('ExhibitionTableComponent', () => {
  let component: ExhibitionTableComponent;
  let fixture: ComponentFixture<ExhibitionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExhibitionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhibitionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
