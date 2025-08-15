import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsComponents } from './product-details-components';

describe('ProductDetailsComponents', () => {
  let component: ProductDetailsComponents;
  let fixture: ComponentFixture<ProductDetailsComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailsComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
