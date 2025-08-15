import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PaymentPlan } from '../model/order-model';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';



@Component({
  selector: 'app-payment-plan-option',
  standalone: true,
  templateUrl: './payment-plan-option-components.html',
  styleUrls: ['./payment-plan-option-components.scss'],
  imports: [CommonModule, TranslateModule]
})
export class PaymentPlanOptionComponents {
  @Input() title!: string;
  @Input() paymentPlans!: PaymentPlan[];
  @Input() currency: string = 'KD';
  @Input() isSelected = false;

  @Output() selectPlan = new EventEmitter<PaymentPlan[]>();
  @Output() selected = new EventEmitter<void>();

  onSelectPlan(): void {
    this.selectPlan.emit(this.paymentPlans);
    this.selected.emit();
  }
displayAmount(val: any, currency: string): string {
  if (typeof val === 'string' && val.trim().toLowerCase() === 'No payment') {
    return val;
  }
  if (!Number.isNaN(+val) && val !== '' && val !== null && val !== undefined) {
    return `${currency} ${Number(val).toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}`;
  }
  return val ?? '';
}


}