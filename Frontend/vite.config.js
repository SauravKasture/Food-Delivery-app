import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://mern-backend-4k19.onrender.com", // Replace with your backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});