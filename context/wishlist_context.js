import React, { useEffect, useState, useContext, useReducer } from "react";
import reducer from "../reducers/wishlist_reducer";
import { ADD_TO_WISHLIST, REMOVE_WISHLIST_ITEM } from "../actions";

const initialState = {
  wishlist: [],
};

const WishlistContext = React.createContext();

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Add to wishlist
  const addToWishlist = (product) => {
    dispatch({
      type: ADD_TO_WISHLIST,
      payload: {
        product,
      },
    });
  };

  // remove wishlist item
  const removeWishlistItem = (id) => {
    dispatch({ type: REMOVE_WISHLIST_ITEM, payload: id });
  };

  useEffect(() => {
    dispatch({ type: "LOAD_WISHLIST" });
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  return (
    <WishlistContext.Provider
      value={{
        ...state,
        addToWishlist,
        removeWishlistItem,
       
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
// make sure use
export const useWishlistContext = () => {
  return useContext(WishlistContext);
};
