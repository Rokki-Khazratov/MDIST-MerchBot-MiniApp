import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/organisms/Header';
import { IconButton } from '../components/atoms/IconButton';
import { Button } from '../components/atoms/Button';
import { Input } from '../components/atoms/Input';
import { Switch } from '../components/atoms/Switch';
import { useCartStore } from '../store/cartStore';
import { formatPrice } from '../utils/currency';
import { CheckoutFormData } from '../types/checkout';
import { createOrder } from '../api/orders';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  const [formData, setFormData] = useState<CheckoutFormData>({
    full_name: '',
    phone_number: '',
    payment_method: 'card',
    promo_code: '',
  });

  const [errors, setErrors] = useState<Partial<CheckoutFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPrice = getTotalPrice();

  const validateForm = (): boolean => {
    const newErrors: Partial<CheckoutFormData> = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Введите полное имя';
    }

    if (!formData.phone_number.trim()) {
      newErrors.phone_number = 'Введите номер телефона';
    } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone_number.replace(/\s/g, ''))) {
      newErrors.phone_number = 'Введите корректный номер телефона';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        items: items.map(item => ({
          product_id: item.productId,
          quantity: item.quantity,
        })),
        customer_name: formData.full_name,
        customer_phone: formData.phone_number,
        payment_method: formData.payment_method,
        promo_code: formData.promo_code || null,
      };

      const order = await createOrder(orderData);
      
      clearCart();
      navigate('/order-success', { 
        state: { 
          orderId: order.id,
          totalPrice: totalPrice 
        } 
      });
    } catch (error) {
      console.error('Order creation failed:', error);
      alert('Произошла ошибка при создании заказа. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
        <Header />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          padding: '20px',
        }}>
          <h2 style={{ color: '#000000', marginBottom: '16px' }}>
            Корзина пуста
          </h2>
          <p style={{ color: '#666666', marginBottom: '24px', textAlign: 'center' }}>
            Добавьте товары в корзину для оформления заказа
          </p>
          <Button
            variant="primary"
            onClick={() => navigate('/')}
          >
            Перейти к товарам
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      <Header />
      
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
          <IconButton
            icon="arrow-left"
            onClick={() => navigate(-1)}
            className="mr-3"
            aria-label="Назад"
          />
          <h1 style={{ color: '#000000', fontSize: '24px', fontWeight: '600' }}>
            Оформление заказа
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Контактная информация */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ 
              color: '#000000', 
              fontSize: '20px', 
              fontWeight: '600', 
              marginBottom: '16px' 
            }}>
              Контактная информация
            </h2>
            
            <div style={{ marginBottom: '16px' }}>
              <Input
                type="text"
                placeholder="Полное имя"
                value={formData.full_name}
                onChange={(value) => setFormData(prev => ({ ...prev, full_name: value }))}
                error={errors.full_name}
                required
              />
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <Input
                type="tel"
                placeholder="Номер телефона"
                value={formData.phone_number}
                onChange={(value) => setFormData(prev => ({ ...prev, phone_number: value }))}
                error={errors.phone_number}
                required
              />
            </div>
          </div>

          {/* Способ оплаты */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ 
              color: '#000000', 
              fontSize: '20px', 
              fontWeight: '600', 
              marginBottom: '16px' 
            }}>
              Способ оплаты
            </h2>
            
            <Switch
              value={formData.payment_method === 'cash'}
              onChange={(isCash) => setFormData(prev => ({ 
                ...prev, 
                payment_method: isCash ? 'cash' : 'card' 
              }))}
              leftLabel="Карта"
              rightLabel="Наличные"
            />
          </div>

          {/* Промокод */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ 
              color: '#000000', 
              fontSize: '20px', 
              fontWeight: '600', 
              marginBottom: '16px' 
            }}>
              Промокод (необязательно)
            </h2>
            
            <Input
              type="text"
              placeholder="Введите промокод"
              value={formData.promo_code}
              onChange={(value) => setFormData(prev => ({ ...prev, promo_code: value }))}
            />
          </div>

          {/* Итого */}
          <div style={{
            backgroundColor: '#F8F9FA',
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '24px',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
            }}>
              <span style={{ fontSize: '18px', fontWeight: '600', color: '#000000' }}>
                Итого:
              </span>
              <span style={{ fontSize: '20px', fontWeight: '700', color: '#CE2F40' }}>
                {formatPrice(totalPrice)}
              </span>
            </div>
            
            <div style={{ fontSize: '14px', color: '#666666' }}>
              {items.length} товар(ов) в заказе
            </div>
          </div>

          {/* Кнопка заказа */}
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            style={{ width: '100%' }}
          >
            {isSubmitting ? 'Обработка...' : 'Оформить заказ'}
          </Button>
        </form>
      </div>
    </div>
  );
};
