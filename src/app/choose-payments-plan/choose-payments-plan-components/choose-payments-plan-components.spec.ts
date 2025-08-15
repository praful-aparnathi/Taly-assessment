import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosePaymentsPlanComponents } from './choose-payments-plan-components';

describe('ChoosePaymentsPlanComponents', () => {
  let component: ChoosePaymentsPlanComponents;
  let fixture: ComponentFixture<ChoosePaymentsPlanComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoosePaymentsPlanComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoosePaymentsPlanComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
