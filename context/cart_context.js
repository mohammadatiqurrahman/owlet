import React, { useEffect, useState, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  ADD_TO_WISHLIST,
  REMOVE_CART_ITEM,
  REMOVE_WISHLIST_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";

const initialState = {
  cart: [],
  wishlist: [],
  total_items: 0,
  total_amount: 0,
  total_tax: 0,
  shipping_fee: 0,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // add to cart
  const addToCart = (
    id,
    selectedColor,
    selectedSize,
    selectedColorName,
    stock,
    amount,
    product
  ) => {
    dispatch({
      type: ADD_TO_CART,
      payload: {
        id,
        selectedColor,
        selectedColorName,
        selectedSize,
        stock,
        amount,
        product,
      },
    });
  };

  // Add to wishlist
  const addToWishlist = (
    id,
    selectedColor,
    selectedSize,
    selectedColorName,
    stock,
    amount,
    product
  ) => {
    dispatch({
      type: ADD_TO_WISHLIST,
      payload: {
        id,
        selectedColor,
        selectedColorName,
        selectedSize,
        stock,
        amount,
        product,
      },
    });
  };

  const [HomeCartWishlistStatus, setHomeCartWishlistStatus] = useState(false);
  //remove cart Item item
  const removeItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };
  // remove wishlist item
  const removeWishlistItem = (id) => {
    dispatch({ type: REMOVE_WISHLIST_ITEM, payload: id });
  };

  //toggle amount, increase or decrease product item
  const toggleAmount = (id, value) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
  };
  //clear cart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  useEffect(() => {
    dispatch({ type: "LOAD_CART" });
    dispatch({ type: "LOAD_WISHLIST" });
  }, []);
  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS });
    localStorage.setItem("cart", JSON.stringify(state.cart));
    localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
  }, [state.cart, state.wishlist]);

  const [placeOrderClick, setPlaceOrderClick] = useState(null);
  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        addToWishlist,
        removeItem,
        removeWishlistItem,
        clearCart,
        toggleAmount,
        placeOrderClick,
        setPlaceOrderClick,
        HomeCartWishlistStatus,
        setHomeCartWishlistStatus,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
