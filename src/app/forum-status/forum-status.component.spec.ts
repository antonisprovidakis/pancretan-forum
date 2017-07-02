import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumStatusComponent } from './forum-status.component';

describe('ForumStatusComponent', () => {
  let component: ForumStatusComponent;
  let fixture: ComponentFixture<ForumStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
