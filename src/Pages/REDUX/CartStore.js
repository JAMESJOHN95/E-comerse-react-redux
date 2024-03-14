import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./Slice/ProductSlice";
import wishlistSlice from "./Slice/WishlistSlice";
import cartSlice from "./Slice/CartSlice";


const CartStore = configureStore({
    reducer: {
        productreducer: productSlice,
        wishlistreducer: wishlistSlice,
        cartReducer: cartSlice
    }
})

export default CartStore