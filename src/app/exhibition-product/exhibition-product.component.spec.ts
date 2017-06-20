import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitionProductComponent } from './exhibition-product.component';

describe('ExhibitionProductComponent', () => {
  let component: ExhibitionProductComponent;
  let fixture: ComponentFixture<ExhibitionProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExhibitionProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhibitionProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
