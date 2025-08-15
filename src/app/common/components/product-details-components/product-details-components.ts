import { Component, Input } from '@angular/core';
import { ProductDetails } from '../model/order-model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-details-components',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './product-details-components.html',
  styleUrls: ['./product-details-components.scss']
})
export class ProductDetailsComponents {
  @Input() productTitle!: string;
  @Input() productDetails!: ProductDetails;
  @Input() currency!: string;
}
