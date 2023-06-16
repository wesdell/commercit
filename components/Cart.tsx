import { useContext } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';

import { CartContext } from '@/context';
import { URLFor } from '@/lib/client';
import { getStripe } from '@/lib/stripe';
import { toast } from 'react-hot-toast';

export function Cart () {
  const {
    totalPrice,
    totalItems,
    itemsInCart,
    toggleCart,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    removeFromCart
  } = useContext(CartContext);

  const handleCheckout = async (): Promise<void> => {
    const stripe = await getStripe();
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ itemsInCart })
    });

    if (response.status === 500) {
      return;
    }

    const data = await response.json();
    toast.loading('Redirecting...');
    stripe?.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <section className="cart-wrapper">
      <section className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={toggleCart}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalItems}) {totalItems === 1 ? 'item' : 'items'}</span>
        </button>
        {
          itemsInCart.length === 0
            ? (
              <article className="empty-cart">
                <AiOutlineShopping size={150} />
                <h3>Your shopping bag is empty.</h3>
                <Link href="/">
                  <button
                    type="button"
                    className="btn"
                    onClick={toggleCart}
                  >
                    Continue Shopping
                  </button>
                </Link>
              </article>
            )
            : (
              <article className="product-container">
                {
                  itemsInCart.map((item) => (
                    <section className="product" key={item._id}>
                      <Image
                        unoptimized
                        src={URLFor(item.image[0])}
                        alt={item.name}
                        className="cart-product-image"
                      />
                      <article className="item-desc">
                        <article className="flex top">
                          <h5>{item.name}</h5>
                          <h4>${item.price}</h4>
                        </article>
                        <article className="flex bottom">
                          <div>
                            <p className="quantity-desc">
                              <span className="minus" onClick={() => decreaseCartItemQuantity(item)}>
                                <AiOutlineMinus />
                              </span>
                              <span className="num">
                                {item.quantity}
                              </span>
                              <span className="plus" onClick={() => increaseCartItemQuantity(item)}>
                                <AiOutlinePlus />
                              </span>
                            </p>
                          </div>
                          <button
                            type="button"
                            className="remove-item"
                            onClick={() => removeFromCart(item)}
                          >
                            <TiDeleteOutline />
                          </button>
                        </article>
                      </article>
                    </section>
                  ))
                }
              </article>
            )
        }
        {itemsInCart.length >= 1 && (
          <article className="cart-bottom">
            <article className="total">
              <h3>Subtotal: </h3>
              <h3>${totalPrice}</h3>
            </article>
            <article className="btn-container">
              <button
                type="button"
                className="btn"
                onClick={handleCheckout}
              >
                Pay with Stripe
              </button>
            </article>
          </article>
        )}
      </section>
    </section>
  );
}
