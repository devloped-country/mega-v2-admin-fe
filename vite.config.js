import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // proxy: {
    //   'https://admin.mzc-appmega.click/api': {
    //     target: 'http://localhost:8081https://admin.mzc-appmega.click/api',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\https://admin.mzc-appmega.click/api/, ''),
    //   },
    // },
  },
  resolve: {
    alias: [
      { find: "@components", replacement: "/src/components" },
      { find: "@", replacement: "/src" },
    ],
  },
});
