import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
    "/api": {
      target: "https://api.edenai.run/v2/image/generation",
      changeOrigin: true,
      secure: false,
      rewrite: (path) => path.replace(/^\/api/, ""),
    },
  },
},
  plugins: [react()],
  define: {
    "process.env": process.env,
    ENV_KEY: process.env.VITE_API_KEY,
  },
  
 
  
  
})
