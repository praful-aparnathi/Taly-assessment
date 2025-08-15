// order.model.ts
export interface OrderItem {
  name: string;
  price: string;
}

export interface OrderDetails {
  items: OrderItem[];
  subTotal: number;
  shipping: number;
  discount: string;
  discount_amount: number;
  total: number;
  currency: string;
}

export interface ProductDetails {
  logo: string;
  productName: string;
  productPrice: string;
  productDescription: string;
  currency: string;

}
export interface PaymentPlan {
  logo: string;
  date: any;
  amount: any;
}


export interface OrderData {
  items: OrderItem[];
  subTotal: number;
  shipping: number;
  discount: string;
  discount_amount: number;
  total: number;
  currency: string;
}