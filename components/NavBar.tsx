import { useContext } from 'react';

import Link from 'next/link';

import { AiOutlineShopping } from 'react-icons/ai';

import { Cart } from './';
import { CartContext } from '@/context';

export function NavBar () {
  const { showCart, totalItems, toggleCart } = useContext(CartContext);

  return (
    <nav className="navbar-container">
      <p className="logo">
        <Link
          href="/"
        >
          Commercit
        </Link>
      </p>
      <button
        type="button"
        className="cart-icon"
        onClick={toggleCart}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">
          {totalItems}
        </span>
      </button>
      {showCart && <Cart />}
    </nav>
  );
}
