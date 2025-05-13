import {configureStore} from '@reduxjs/toolkit'
import productsReducers from '../features/Products/ProductsSlice'
import usersReducers from '../features/users/UsersSlice'

export const store = configureStore({
    reducer:{
    products: productsReducers,
    users:  usersReducers
    }
}) ;


