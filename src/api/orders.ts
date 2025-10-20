import { APIOrder, CreateOrderRequest } from '../types/api';

const API_BASE_URL = 'http://127.0.0.1:8000';

export const createOrder = async (orderData: CreateOrderRequest): Promise<APIOrder> => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const order = await response.json();
    return order;
  } catch (error) {
    console.error('Failed to create order:', error);
    throw error;
  }
};
