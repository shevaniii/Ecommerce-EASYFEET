import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
    '/api' :{
     target:"https://easyfeet-shoes.onrender.com",
     changeOrigin:true,
     secure:false
    }
  }
},
  plugins: [react()] ,
})
