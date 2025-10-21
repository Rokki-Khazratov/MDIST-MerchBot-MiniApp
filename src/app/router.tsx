import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrderSuccessPage } from '../pages/OrderSuccessPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/product/:id',
    element: <ProductDetailPage />,
  },
  {
    path: '/checkout',
    element: <CheckoutPage />,
  },
  {
    path: '/order-success',
    element: <OrderSuccessPage />,
  },
]);
