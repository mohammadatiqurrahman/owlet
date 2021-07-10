import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import reducer from "../reducers/products_reducer";
import { parentNavigationUrl,allCategories } from "../utils/constants";

import {
  GET_NAVIGATION_BEGIN,
  GET_NAVIGATION_SUCCESS,
  GET_NAVIGATION_ERROR,
  GET_NAVIGATION_CHILD_BEGIN,
  GET_NAVIGATION_CHILD_SUCCESS,
  GET_NAVIGATION_CHILD_ERROR,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const initialState = {
  navigations: [],
  navigations_loading: false,
  navigations_error: false,

  // Note: "nanavigations_child" represents "all_categories"
  navigations_child: [],
  navigations_child_loading: false,
  navigations_child_error: false,

  products_loading: false,
  products_error: false,
  products: [],
  // featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
};

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch navigation
  const fetchNavigations = async (url) => {
    dispatch({ type: GET_NAVIGATION_BEGIN });
    try {
      const response = await axios.get(url);
      const navigations = response.data;
      dispatch({ type: GET_NAVIGATION_SUCCESS, payload: navigations });
    } catch (error) {
      dispatch({ type: GET_NAVIGATION_ERROR });
    }
  };
  // Fetch navigation child
  const fetchNavigationsChild = async (url) => {
    dispatch({ type: GET_NAVIGATION_CHILD_BEGIN });
    try {
      const response = await axios.get(url);
      const navigationsChild = response.data;
      dispatch({ type: GET_NAVIGATION_CHILD_SUCCESS, payload: navigationsChild });
    } catch (error) {
      dispatch({ type: GET_NAVIGATION_CHILD_ERROR });
    }
  };

  // Fetch all products
  const fetchProducts = async (url) => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const response = await axios.get(url);
      const products = response.data;

      const modifiedProducts = products.length>0 ? products.map((item) => {
        const variants = JSON.parse(item.variants);
        // console.log(variants);
        const merged = [].concat.apply([], variants);
        const sizes = merged.map((item) => item.sizes);
        const mergedSizes = [].concat.apply([], sizes);
        // console.log(mergedSizes)
        const actualSizes = mergedSizes.map((item) => Object.keys(item));
        // console.log(actualSizes)
        const sizeArray = [].concat.apply([], actualSizes);
        // console.log(sizeArray)
        let uniqueSizes = ["all", ...new Set(sizeArray)];
        // console.log(uniqueSizes);
        const uniqueColorCode = [
          "all",
          ...new Set(merged.map((item) => item.color_code)),
        ];
        // console.log(colorCode);
        const uniqueColorName = [
          "all",
          ...new Set(merged.map((item) => item.color_name)),
        ];

        // console.log(variants);
        const newItem = {
          ...item,
          newVariants: variants,
          uniqueSizes,
          uniqueColorCode,
          uniqueColorName,
        };
        return newItem;
      }):[];
      // console.log(modifiedProducts);
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: modifiedProducts });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };

  // Fetch Single Product
  // 1. "url" is coming from CollectionsPage/Product.js
  const fetchSingleProduct = async (url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      const response = await axios.get(url);
      const singleProduct = response.data;

      const variants = JSON.parse(singleProduct.variants);
      const modifiedSingleProduct = { ...singleProduct, newVariants: variants };
      // console.log(modifiedSingleProduct);

      dispatch({
        type: GET_SINGLE_PRODUCT_SUCCESS,
        payload: modifiedSingleProduct,
      });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  };

  //Cart Handler
  const handleCart = (openClose) => {
    const cartToggle = document.querySelector(".cart-dropdown");
    if (openClose === "open") {
      cartToggle.classList.add("opened");
    }
    if (openClose === "close") {
      cartToggle.classList.remove("opened");
    }
  };

  useEffect(() => {
    fetchNavigations(parentNavigationUrl);
    fetchNavigationsChild(allCategories);
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        fetchProducts,
        fetchSingleProduct,
        handleCart,
        // fetchNavigationsChild,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
