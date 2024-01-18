import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import "dotenv/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/user": {
        target:
          `http://localhost:${process.env.PORT}` || "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
      "/boards": {
        target:
          `http://localhost:${process.env.PORT}` || "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    },
    port: 5173,
  },
});
