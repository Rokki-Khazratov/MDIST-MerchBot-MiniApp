import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Header } from '../components/organisms/Header';
import { Button } from '../components/atoms/Button';
import { formatPrice } from '../utils/currency';

export const OrderSuccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const orderId = location.state?.orderId;
  const totalPrice = location.state?.totalPrice;

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
        textAlign: 'center',
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: '#CE2F40',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
        }}>
          <CheckCircle size={40} color="#FFFFFF" />
        </div>

        <h1 style={{
          color: '#000000',
          fontSize: '28px',
          fontWeight: '700',
          marginBottom: '16px',
        }}>
          Заказ успешно оформлен!
        </h1>

        <p style={{
          color: '#666666',
          fontSize: '16px',
          marginBottom: '24px',
          maxWidth: '400px',
        }}>
          Спасибо за ваш заказ! Мы свяжемся с вами в ближайшее время для подтверждения.
        </p>

        {orderId && (
          <div style={{
            backgroundColor: '#F8F9FA',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '24px',
          }}>
            <p style={{ color: '#000000', fontSize: '14px', marginBottom: '4px' }}>
              Номер заказа:
            </p>
            <p style={{ color: '#CE2F40', fontSize: '18px', fontWeight: '600' }}>
              #{orderId}
            </p>
            {totalPrice && (
              <p style={{ color: '#666666', fontSize: '14px', marginTop: '8px' }}>
                Сумма: {formatPrice(totalPrice)}
              </p>
            )}
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button
            variant="primary"
            onClick={() => navigate('/')}
          >
            Продолжить покупки
          </Button>
          
          <Button
            variant="secondary"
            onClick={() => window.print()}
          >
            Распечатать чек
          </Button>
        </div>
      </div>
    </div>
  );
};
