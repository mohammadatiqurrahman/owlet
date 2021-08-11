import { toast } from "react-toastify";
import { ADD_TO_WISHLIST, REMOVE_WISHLIST_ITEM } from "../actions";

const wishlist_reducer = (state, action) => {
  if (action.type === ADD_TO_WISHLIST) {
    const { product } = action.payload;

    const tempItem = state.wishlist.find((item) => item.slug === product.slug);
    // console.log(tempItem);
    if (tempItem) {
      toast.error("Already in wishlist");
      return { ...state, wishlist: [...state.wishlist] };
    } else {
      toast.success("Successfully added to the wishlist");
      return { ...state, wishlist: [...state.wishlist, product] };
    }
  }
  if (action.type === "LOAD_WISHLIST") {
    const getWishlistLocalStorage = () => {
      let tempWishlist = localStorage.getItem("wishlist");
      if (tempWishlist) {
        return JSON.parse(localStorage.getItem("wishlist"));
      } else {
        return [];
      }
    };

    return { ...state, wishlist: getWishlistLocalStorage() };
  }

  if (action.type === REMOVE_WISHLIST_ITEM) {
    const tempWishlist = state.wishlist.filter(
      (item) => item.id !== action.payload
    );
    return { ...state, wishlist: tempWishlist };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default wishlist_reducer;
