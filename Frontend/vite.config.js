import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://food-delivery-app-wbdz.onrender.com", // Replace with your backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});