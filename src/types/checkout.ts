export interface CheckoutFormData {
  full_name: string;
  phone_number: string;
  payment_method: 'card' | 'cash';
  promo_code: string;
}
