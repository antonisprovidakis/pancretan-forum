import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NegotiationsTableComponent } from './negotiations-table.component';

describe('NegotiationsTableComponent', () => {
  let component: NegotiationsTableComponent;
  let fixture: ComponentFixture<NegotiationsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NegotiationsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NegotiationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
