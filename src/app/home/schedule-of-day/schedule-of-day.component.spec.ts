import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleOfDayComponent } from './schedule-of-day.component';

describe('ScheduleOfDayComponent', () => {
  let component: ScheduleOfDayComponent;
  let fixture: ComponentFixture<ScheduleOfDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleOfDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleOfDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
