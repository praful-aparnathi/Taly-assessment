import { ChangeDetectorRef, Component, effect, HostListener, inject } from '@angular/core';
import { ProductDetailsComponents } from '../../common/components/product-details-components/product-details-components';
import { PaymentPlanOptionComponents } from '../../common/components/payment-plan-option-components/payment-plan-option-components';
import { OrderDetailsComponents } from '../../common/components/order-details-components/order-details-components';
import { PaymentPlanService } from '../../common/services/payment-plan-service';
import { OrderDetails, PaymentPlan } from '../../common/components/model/order-model';
import { TranslateModule } from '@ngx-translate/core';
import { SharedsignalServices } from '../../common/services/sharedsignal-services';
import { Subscription } from 'rxjs';
import { AppTranslateService } from '../../common/services/translate-services';

@Component({
  selector: 'app-choose-payments-plan',
  standalone: true,
  imports: [ProductDetailsComponents, PaymentPlanOptionComponents, OrderDetailsComponents, TranslateModule],
  templateUrl: './choose-payments-plan-components.html',
  styleUrls: ['./choose-payments-plan-components.scss']
})
export class ChoosePaymentsPlanComponents {
  transferSignal = inject(SharedsignalServices);

  paymentDetails: any;
  productDetails: any;
  splitPlan: any;
  todayPlan: any;
  selectedPlan: PaymentPlan[] | null = null;
  selectedPlanType: string | null = null; // Track which plan is selected
  order = {
    currency: 'KD'
  };
  textDirection: any = 'ltr'
  currentLang: string = 'en';
  private langSub?: Subscription;
  orderDetails: OrderDetails = {
    items: [],
    subTotal: 0,
    shipping: 0,
    discount: '',
    discount_amount: 0,
    total: 0,
    currency: 'KD'
  };
  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const paymentPlanContainers = document.querySelectorAll('.payment-plans-container');

    let clickedInside = false;
    paymentPlanContainers.forEach(container => {
      if (container.contains(clickedElement)) {
        clickedInside = true;
      }
    });

    if (!clickedInside) {
      this.selectedPlanType = null;
      this.selectedPlan = null;
    }
  }


  constructor(private paymentPlanService: PaymentPlanService
  ) {
    effect(() => {
        this.textDirection = this.transferSignal.textDirection();
      this.getOrderDetails();
      this.getSplitPlan();
      this.getProductDetauls();
      this.getTodayPlan();
    });
  }

  ngOnInit(): void {
   
  }

  getOrderDetails() {
    this.paymentPlanService.getOrderDetails().subscribe(data => {
      this.orderDetails = data;
    });
  }

  getSplitPlan() {
    this.paymentPlanService.getSplitPlan().subscribe(data => {
      this.splitPlan = data;

    });
  }

  getTodayPlan() {
    this.paymentPlanService.getTodayPlan().subscribe(data => {
      this.todayPlan = data;


    });
  }

  getProductDetauls() {
    this.paymentPlanService.getProductDetails().subscribe(data => {
      this.productDetails = data;
    });
  }

  onPlanSelect(plans: PaymentPlan[], planType: string): void {
    this.selectedPlan = plans;
    this.selectedPlanType = planType;
  }
}