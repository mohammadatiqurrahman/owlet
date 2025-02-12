import {
  LOAD_PRODUCTS,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    if (action.payload.length > 0) {
      const price = action.payload.map((item) => item.price);
      const maxPrice = Math.max(...price);
      const minPrice = Math.min(...price);

      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: {
          ...state.filters,
          min_price: minPrice,
          max_price: maxPrice,
          price: maxPrice,
        },
      };
    } else {
      return { ...state, all_products: [], filtered_products: [] };
    }
  }

  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];
    // Sorting low to high price
    if (sort === "price-lowest") {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price);
    }
    if (sort === "price-highest") {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }
    if (sort === "name-a") {
      tempProducts = tempProducts.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    }
    if (sort === "name-z") {
      tempProducts = tempProducts.sort((a, b) => {
        return b.title.localeCompare(a.title);
      });
    }
    return { ...state, filtered_products: tempProducts };
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }
  
  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state;
    const { text, category, size, color, price, shipping } = state.filters;
    let tempProducts = [...all_products];

    // filter with size
    if (size !== "all") {
      tempProducts = tempProducts.filter((item) => {
        const newItem = item.uniqueSizes.find((e) => {
          return e === size;
        });
        return newItem;
      });
    }

    // colors
    if (color !== "all") {
      tempProducts = tempProducts.filter((item) => {
        const newItem = item.uniqueColorCode.find((e) => {
          return e === color;
        });
        return newItem;
      });
    }

    // price
    tempProducts = tempProducts.filter((product) => product.price <= price);

    return { ...state, filtered_products: tempProducts };
  }
  
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        category: "all",
        size: "all",
        color: "all",
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
