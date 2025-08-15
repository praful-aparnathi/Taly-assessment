import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPlanOptionComponents } from './payment-plan-option-components';

describe('PaymentPlanOptionComponents', () => {
  let component: PaymentPlanOptionComponents;
  let fixture: ComponentFixture<PaymentPlanOptionComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentPlanOptionComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentPlanOptionComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
