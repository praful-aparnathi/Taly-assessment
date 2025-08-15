import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsComponents } from './order-details-components';

describe('OrderDetailsComponents', () => {
  let component: OrderDetailsComponents;
  let fixture: ComponentFixture<OrderDetailsComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderDetailsComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDetailsComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
