import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './checout';

const stripePromise = loadStripe('');

function Payement() {
  const [clientSecret, setClientSecret] = useState('');

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };

  const createPaymentIntent = async () => {
    const res = await fetch('http://localhost:5000/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 500 }), // $50
    });
    const data = await res.json();
    setClientSecret(data.clientSecret);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Pay for Creator - $50</h2>
      {!clientSecret ? (
        <button onClick={createPaymentIntent}>Proceed to Payment</button>
      ) : (
        // <Elements stripe={stripePromise} options={{ clientSecret }}>
        //   <CheckoutForm />
        // </Elements>
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default Payement;