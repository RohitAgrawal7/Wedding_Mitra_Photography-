import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Wedding_Mitra_Photography-",
  server: {
    port: 3000,
  },
});
