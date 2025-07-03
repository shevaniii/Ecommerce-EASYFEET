import {configureStore} from '@reduxjs/toolkit'
import productsReducers from '../features/Products/ProductsSlice'
import usersReducers from '../features/users/UsersSlice'
import cartReducers from '../features/Products/CartSlice.js'
import orderReducers from '../features/Products/OrderSlice.js'
export const store = configureStore({
    reducer:{
    products: productsReducers,
    users:  usersReducers,
    cart: cartReducers,
    orders: orderReducers
    }
}) ;


