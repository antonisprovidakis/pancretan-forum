import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCommentsDialog1Component } from './product-comments-dialog1.component';

describe('ProductCommentsDialog1Component', () => {
  let component: ProductCommentsDialog1Component;
  let fixture: ComponentFixture<ProductCommentsDialog1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCommentsDialog1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCommentsDialog1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
