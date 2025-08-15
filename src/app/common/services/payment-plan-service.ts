import { Injectable } from '@angular/core';
import { Observable, map, forkJoin, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { OrderDetails, PaymentPlan, ProductDetails } from '../components/model/order-model';

export interface OrderItem {
  name: string;
  price: number | string;
}



@Injectable({ providedIn: 'root' })
export class PaymentPlanService {
  constructor(private translate: TranslateService) { }

  getOrderDetails(): Observable<OrderDetails> {
    const keys = [
      'PROD_1',
      'PROD_1_PRICE',
      'PROD_2',
      'PROD_2_PRICE',
      'PROD_3',
      'PROD_3_PRICE',
      'SUB_TOTAL_PRICE',
      'SHIPPING_PRICE',
      'SHIPPING_DISCOUNT_AMOUNT',
      'SHIPPING_DISCOUNT',
      'TOTAL_PRODUCT'
    ];

    return this.translate.get(keys).pipe(
      map(t => ({
        items: [
          { name: t['PROD_1'], price: t['PROD_1_PRICE'] },
          { name: t['PROD_2'], price: t['PROD_2_PRICE'] },
          { name: t['PROD_3'], price: t['PROD_3_PRICE'] }
        ],
        subTotal: t['SUB_TOTAL_PRICE'],
        shipping: t['SHIPPING_PRICE'],
        discount_amount: t['SHIPPING_DISCOUNT_AMOUNT'],
        discount: t['SHIPPING_DISCOUNT'],
        total: t['TOTAL_PRODUCT'],
        currency: ''
      }))
    );
  }

  getProductDetails(): Observable<ProductDetails> {
    return this.translate.get([
      'PRODUCT_NAME',
      'TOTAL_PRODUCT',
      'INCLUDING_VAT',

    ]).pipe(
      map(translations => ({
        logo: 'assets/images/partners-logo.svg',
        productName: translations['PRODUCT_NAME'],
        productPrice: translations['TOTAL_PRODUCT'],
        productDescription: translations['INCLUDING_VAT'],
        currency: 'KD',
      }))
    );
  }

  getTodayPlan(): Observable<PaymentPlan[]> {
    return new Observable(observer => {
      const translateKeys = [
        'TODAY',
        'DUE_ON_THIRD_INSTALLMENT',
        'NO_PAYMENT',
        'TOTAL_PRICE',
        'TODAY_PRICE',
        'DUE_ON_FIRST_INSTALLMENT'
      ];

      const updatePlan = () => {
        this.translate.get(translateKeys).subscribe(translations => {
          const todayPrice = parseFloat(translations['TOTAL_PRICE'].replace('KD', '').trim());
          const amountValue = todayPrice;

          const isMobile = window.innerWidth <= 768;
          const today = isMobile ? translations['NO_PAYMENT'] : translations['TODAY'];
          const noPayment = isMobile ? translations['TODAY'] : translations['NO_PAYMENT'];
          const icon = isMobile
            ? 'assets/images/inst-0.svg'
            : 'assets/images/inst-1.svg';

          observer.next([
            {
              logo: icon,
              date: today,
              amount: noPayment,
            },
            {
              logo: 'assets/images/inst-4.svg',
              date: isMobile ? translations['TOTAL_PRICE'] : translations['DUE_ON_THIRD_INSTALLMENT'],
              amount: isMobile ? translations['DUE_ON_FIRST_INSTALLMENT'] : translations['TODAY_PRICE']

            }
          ]);
        });
      };

      updatePlan();
      const resizeHandler = () => updatePlan();
      window.addEventListener('resize', resizeHandler);
      return () => window.removeEventListener('resize', resizeHandler);
    });
  }


  getSplitPlan(): Observable<PaymentPlan[]> {
    return this.translate.get([
      'TODAY',
      'DUE_ON_FIRST_INSTALLMENT',
      'DUE_ON_SECCOND_INSTALLMENT',
      'DUE_ON_THIRD_INSTALLMENT',
      'TODAY_PRICE'
    ]).pipe(
      map(translations => {
        const amountValue = translations['TODAY_PRICE'].replace('KD', '').trim();

        return [
          {
            logo: 'assets/images/inst-1.svg',
            date: translations['TODAY'],
            amount: amountValue,
            description: ''
          },
          {
            logo: 'assets/images/inst-2.svg',
            date: translations['DUE_ON_FIRST_INSTALLMENT'],
            amount: amountValue,
            description: ''
          },
          {
            logo: 'assets/images/inst-3.svg',
            date: translations['DUE_ON_SECCOND_INSTALLMENT'],
            amount: amountValue,
            description: ''
          },
          {
            logo: 'assets/images/inst-4.svg',
            date: translations['DUE_ON_THIRD_INSTALLMENT'],
            amount: amountValue,
            description: ''
          }
        ];
      })
    );
  }


}
