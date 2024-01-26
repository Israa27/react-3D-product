import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
// https://vitejs.dev/config/
export default defineConfig({

  plugins: [react()],
  define: {
    "process.env": process.env,
    ENV_KEY: process.env.VITE_API_KEY,
  },
  build: {
    outDir: 'dist',
  },
  
 
  
  
})
