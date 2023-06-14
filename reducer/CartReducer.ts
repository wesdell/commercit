/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { CartStateProps } from '@/context';
import type { IProduct } from '@/interfaces';

type CartActionType =
  | { type: 'SHOW_CART' }
  | { type: 'INCREASE_QUANTITY' }
  | { type: 'DECREASE_QUANTITY' }
  | { type: 'INCREASE_CART_ITEM_QUANTITY', payload: IProduct }
  | { type: 'DECREASE_CART_ITEM_QUANTITY', payload: IProduct }
  | { type: 'REMOVE_FROM_CART', payload: IProduct }
  | { type: 'UPDATE_TOTAL_ITEMS' }
  | { type: 'ADD_TO_CART', payload: {
    product: IProduct,
    quantity: number
  } }

export const CartReducer = (state: CartStateProps, action: CartActionType): CartStateProps => {
  switch (action.type) {
  case 'INCREASE_QUANTITY':
    return {
      ...state,
      quantity: state.quantity + 1
    };
  case 'DECREASE_QUANTITY': {
    if (state.quantity <= 1) {
      return {
        ...state,
        quantity: 1
      };
    }
    return {
      ...state,
      quantity: state.quantity - 1
    };
  }
  case 'ADD_TO_CART': {
    const product = state.itemsInCart.find((product) => product._id === action.payload.product._id);

    if (product === undefined) {
      action.payload.product.quantity = action.payload.quantity;
      return {
        ...state,
        itemsInCart: [...state.itemsInCart, action.payload.product],
        totalPrice: state.totalPrice + action.payload.product.price * action.payload.quantity,
        quantity: 1
      };
    }
    return {
      ...state,
      totalPrice: state.totalPrice + action.payload.product.price * action.payload.quantity,
      itemsInCart: state.itemsInCart.map((product) => {
        if (product._id === action.payload.product._id) {
          return {
            ...product,
            quantity: product.quantity! + action.payload.quantity
          };
        }
        return product;
      }),
      quantity: 1
    };
  }
  case 'SHOW_CART':
    return {
      ...state,
      showCart: !state.showCart
    };
  case 'UPDATE_TOTAL_ITEMS': {
    let totalItems = 0;
    state.itemsInCart.forEach((product) => totalItems += product.quantity!);
    return {
      ...state,
      totalItems
    };
  }
  case 'INCREASE_CART_ITEM_QUANTITY':
    return {
      ...state,
      itemsInCart: state.itemsInCart.map((product) => {
        if (product._id === action.payload._id) {
          return {
            ...product,
            quantity: product.quantity! + 1
          };
        }
        return product;
      }),
      totalPrice: state.totalPrice + action.payload.price
    };
  case 'DECREASE_CART_ITEM_QUANTITY': {
    return {
      ...state,
      itemsInCart: state.itemsInCart.map((product) => {
        if (product._id === action.payload._id) {
          return {
            ...product,
            quantity: product.quantity! > 1 ? product.quantity! - 1 : 1
          };
        }
        return product;
      }),
      totalPrice: state.totalPrice - (action.payload.quantity! > 1 ? action.payload.price : 0)
    };
  }
  case 'REMOVE_FROM_CART':
    return {
      ...state,
      itemsInCart: state.itemsInCart.filter((product) => product._id !== action.payload._id),
      totalPrice: state.totalPrice - action.payload.price * action.payload.quantity!
    };
  default:
    return state;
  }
};