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

const products_reducer = (state, action) => {
  // Navigation state
  if (action.type === GET_NAVIGATION_BEGIN) {
    return { ...state, navigations_loading: true };
  }
  if (action.type === GET_NAVIGATION_SUCCESS) {
    return {
      ...state,
      navigations_loading: false,
      navigations: action.payload,
    };
  }
  if (action.type === GET_NAVIGATION_ERROR) {
    return { ...state, navigations_loading: false, navigations_error: true };
  }
  // Navigation Child state
  if (action.type === GET_NAVIGATION_CHILD_BEGIN) {
    return { ...state, navigations_child_loading: true };
  }
  if (action.type === GET_NAVIGATION_CHILD_SUCCESS) {
    return {
      ...state,
      navigations_child_loading: false,
      navigations_child: action.payload,
    };
  }
  if (action.type === GET_NAVIGATION_CHILD_ERROR) {
    return {
      ...state,
      navigations_child_loading: false,
      navigations_child_error: true,
    };
  }

  // Fetch all products
  if (action.type === GET_PRODUCTS_BEGIN) {
    return { ...state, products_loading: true };
  }
  if (action.type === GET_PRODUCTS_SUCCESS) {
    // const featured_products = action.payload.filter(
    //   (product) => product.featured === true
    // );
    return {
      ...state,
      products_loading: false,
      products: action.payload,
      // featured_products,
    };
  }
  if (action.type === GET_PRODUCTS_ERROR) {
    return { ...state, products_loading: false, products_error: true };
  }

  //Single product
  if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
    return {
      ...state,
      single_product_loading: true,
      single_product_error: false,
    };
  }
  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return {
      ...state,
      single_product_loading: false,
      single_product: action.payload,
    };
  }
  if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    return {
      ...state,
      single_product_loading: false,
      single_product_error: true,
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default products_reducer;
