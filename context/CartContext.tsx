import React, { createContext, useEffect, useReducer } from 'react';

import { toast } from 'react-hot-toast';

import type { IProduct } from '@/interfaces';
import { CartReducer } from '@/reducer';

export interface CartContextProps {
  showCart: boolean
  itemsInCart: IProduct[]
  totalPrice: number
  totalItems: number
  quantity: number
  toggleCart: () => void
  increaseQuantity: () => void
  decreaseQuantity: () => void
  increaseCartItemQuantity: (product: IProduct) => void
  decreaseCartItemQuantity: (product: IProduct) => void
  addToCart: (product: IProduct, quantity: number) => void
  buyNow: (product: IProduct, quantity: number) => void
  removeFromCart: (product: IProduct) => void
  successPayment: () => void
}

export interface CartStateProps {
  showCart: boolean
  itemsInCart: IProduct[]
  totalPrice: number
  totalItems: number
  quantity: number
}

const INITIAL_CART: CartStateProps = {
  showCart: false,
  itemsInCart: [],
  totalPrice: 0,
  totalItems: 0,
  quantity: 1
};

export const CartContext: React.Context<CartContextProps> = createContext({} as CartContextProps);

interface Props {
  children: React.ReactNode
}

export const CartProvider = ({ children }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(CartReducer, INITIAL_CART);

  useEffect(() => {
    dispatch({ type: 'UPDATE_TOTAL_ITEMS' });
  }, [state.itemsInCart]);
  

  const toggleCart = () => {
    dispatch({ type: 'SHOW_CART' });
  };

  const increaseQuantity = () => {
    dispatch({ type: 'INCREASE_QUANTITY' });
  };

  const decreaseQuantity = () => {
    dispatch({ type: 'DECREASE_QUANTITY' });
  };

  const addToCart = (product: IProduct, quantity: number) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity} });
    toast.success(`${quantity} ${product.name} added to the cart.`);
  };

  const increaseCartItemQuantity = (product: IProduct) => {
    dispatch({ type: 'INCREASE_CART_ITEM_QUANTITY', payload: product });
  };
  
  const decreaseCartItemQuantity = (product: IProduct) => {
    dispatch({ type: 'DECREASE_CART_ITEM_QUANTITY', payload: product });
  };

  const removeFromCart = (product: IProduct) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product });
  };

  const successPayment = () => {
    dispatch({ type: 'SUCCESS_PAYMENT' });
  };

  const buyNow = (product: IProduct, quantity: number) => {
    addToCart(product, quantity);
    toggleCart();
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        toggleCart,
        increaseQuantity,
        decreaseQuantity,
        increaseCartItemQuantity,
        decreaseCartItemQuantity,
        addToCart,
        buyNow,
        removeFromCart,
        successPayment
      }}
    >
      {children}
    </CartContext.Provider>
  );
};