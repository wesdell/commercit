import Link from 'next/link';

import { AiOutlineShopping } from 'react-icons/ai';

export function NavBar () {
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
        // onClick={}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">
          1
        </span>
      </button>
    </nav>
  );
}
