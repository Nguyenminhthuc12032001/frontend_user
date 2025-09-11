import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'   // ← thêm import path

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {              // ← alias phải nằm trong resolve
    alias: {
      'main-components': path.resolve(__dirname, 'src/main-components'),
      'manage-pet': path.resolve(__dirname, 'src/main-components/ManagePet'),
      'appointments': path.resolve(__dirname, 'src/main-components/Appointments'),
      'shop': path.resolve(__dirname, 'src/main-components/Shop'),
      'track-health': path.resolve(__dirname, 'src/main-components/TrackHealth'),
    }
  }
})
