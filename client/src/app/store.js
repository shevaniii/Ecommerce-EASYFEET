import {configureStore} from '@reduxjs/toolkit'
import productsReducers from '../features/Products/ProductsSlice'

export const store = configureStore({
    reducer:{
    products: productsReducers
    }
}) ;


