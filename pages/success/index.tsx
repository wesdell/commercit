import { useEffect, useContext } from 'react';

import Link from 'next/link';

import { BsBagCheckFill } from 'react-icons/bs';

import { CartContext } from '@/context';

export default function Home() {
  const { successPayment } = useContext(CartContext);

  useEffect(() => {
    successPayment();
  }, [successPayment]);
  
  
  return (
    <section className="success-wrapper">
      <section className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">
          Check your email inbox for the receipt.
        </p>
        <p className="description">
          If you have any questions, please email
          <a className="email" href="mailto:order@example.com"> Commercit Customer Service</a>
        </p>
        <Link href="/">
          <button type="button" className="btn">
            Continue Shopping
          </button>
        </Link>
      </section>
    </section>
  );
}
