import {
  ADD_TO_CART,
  ADD_TO_WISHLIST,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  REMOVE_WISHLIST_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const {
      id,
      selectedColor,
      selectedColorName,
      selectedSize,
      stock,
      amount,
      product,
    } = action.payload;

    const tempItem = state.cart.find(
      (item) => item.id === id + selectedColor + selectedSize
    );
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + selectedColor + selectedSize) {
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }

          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });
      return { ...state, cart: tempCart };
    } else {
      const newItem = {
        id: id + selectedColor + selectedSize,
        name: product.title,
        color: selectedColor,
        colorName: selectedColorName,
        size: selectedSize,
        amount,
        image: product.main_image,
        price: product.sale_percentage
          ? Math.round(
              JSON.parse(product.price) -
                (JSON.parse(product.sale_percentage) *
                  JSON.parse(product.price)) /
                  100
            )
          : product.price && JSON.parse(product.price),
        real_price: product.price,
        tax: product.tax,
        discount: product.sale_percentage,
        max: stock,
        product_id: product.id,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }
  if (action.type === "LOAD_CART") {
    const getLocalStorage = () => {
      // let cart = localStorage.getItem("cart");
      let tempCart = localStorage.getItem("cart");
      if (tempCart) {
        return JSON.parse(localStorage.getItem("cart"));
      } else {
        return [];
      }
    };
    return { ...state, cart: getLocalStorage() };
  }
  if (action.type === ADD_TO_WISHLIST) {
    const {
      id,
      selectedColor,
      selectedColorName,
      selectedSize,
      stock,
      amount,
      product,
    } = action.payload;

    const tempItem = state.wishlist.find(
      (item) => item.id === id + selectedColor + selectedSize
    );
    if (tempItem) {
      const tempWishlist = state.wishlist.map((wishlistItem) => {
        if (wishlistItem.id === id + selectedColor + selectedSize) {
          let newAmount = wishlistItem.amount + amount;
          if (newAmount > wishlistItem.max) {
            newAmount = wishlistItem.max;
          }

          return { ...wishlistItem, amount: newAmount };
        } else {
          return wishlistItem;
        }
      });
      return { ...state, wishlist: tempWishlist };
    } else {
      const newItem = {
        id: id + selectedColor + selectedSize,
        name: product.title,
        color: selectedColor,
        colorName: selectedColorName,
        size: selectedSize,
        amount,
        image: product.main_image,
        price: product.sale_percentage
          ? Math.round(
              JSON.parse(product.price) -
                (JSON.parse(product.sale_percentage) *
                  JSON.parse(product.price)) /
                  100
            )
          : product.price && JSON.parse(product.price),
        real_price: product.price,
        tax: product.tax,
        discount: product.sale_percentage,
        max: stock,
        product_id: product.id,
        slug: product.slug,
      };
      return { ...state, wishlist: [...state.wishlist, newItem] };
    }
  }
  if (action.type === "LOAD_WISHLIST") {
    const getWishlistLocalStorage = () => {
      // let cart = localStorage.getItem("cart");
      let tempWishlist = localStorage.getItem("wishlist");
      if (tempWishlist) {
        return JSON.parse(localStorage.getItem("wishlist"));
      } else {
        return [];
      }
    };
    return { ...state, wishlist: getWishlistLocalStorage() };
  }
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: tempCart };
  }
  if (action.type === REMOVE_WISHLIST_ITEM) {
    const tempWishlist = state.wishlist.filter(
      (item) => item.id !== action.payload
    );
    return { ...state, wishlist: tempWishlist };
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === "inc") {
          let newAmount = item.amount + 1;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        }
        if (value === "dec") {
          let newAmount = item.amount - 1;
          if (newAmount < 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount };
        }
      } else {
        return item;
      }
    });
    return { ...state, cart: tempCart };
  }
  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_amount, total_tax } = state.cart.reduce(
      (total, cartItem) => {
        const { amount, price, tax } = cartItem;
        total.total_items += amount;
        total.total_amount += price * amount;
        total.total_tax += Math.round(((tax * price) / 100) * amount);
        return total;
      },
      {
        total_items: 0,
        total_amount: 0,
        total_tax: 0,
      }
    );
    return { ...state, total_items, total_amount, total_tax };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
