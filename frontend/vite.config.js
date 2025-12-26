import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
    // this part for mobile access
  server: {
    host: true,       
    port: 5173,    
     strictPort: true,
    allowedHosts: true 
  },
})
