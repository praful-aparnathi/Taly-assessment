import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { OrderData } from '../model/order-model';



@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './order-details-components.html',
  styleUrls: ['./order-details-components.scss']
})
export class OrderDetailsComponents {
  @Input() title!: string;
  @Input() orderData: OrderData = {
    items: [],
    subTotal: 0,
    shipping: 0,
    discount: '',
    discount_amount:0,
    total: 0,
    currency: 'KD'
  };
}