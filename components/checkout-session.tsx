'use client';

import { CheckCheck, XCircle } from 'lucide-react';
import { useEffect } from 'react';
import Stripe from 'stripe';
import { useShoppingCart } from 'use-shopping-cart';

interface Props {
  customerDitail: Stripe.Checkout.Session.CustomerDetails;
}

export function CheckoutSession({ customerDitail }: Props) {
  const { clearCart } = useShoppingCart();
  useEffect(() => {
    clearCart();
  }, [customerDitail, clearCart]);

  if (!customerDitail) {
    return (
      <>
        <XCircle className="mx-auto h-10 w-10 text-red-400" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-red-400 sm:text-5xl">
          No checkout session found
        </h1>
      </>
    );
  }

  return (
    <>
      <CheckCheck className="mx-auto h-10 w-10 text-lime-500 dark:text-lime-400" />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-lime-500 dark:text-lime-400 sm:text-5xl">
        Order Successful!
      </h1>
      <h3 className="mt-8 text-2xl leading-7">
        Thank you, <span className="font-extrabold">{customerDitail.name}</span>
        !
      </h3>
      <p className="mt-8">
        Check your purchase email{' '}
        <span className="mx-1 font-extrabold text-indigo-500">
          {customerDitail.email}
        </span>
        for your invoice.
      </p>
    </>
  );
}
