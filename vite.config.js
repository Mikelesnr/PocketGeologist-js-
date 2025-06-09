import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        mineralPage: resolve(__dirname, "src/mineral_page/index.html"),
        mineralListing: resolve(__dirname, "src/mineral_listing/index.html"),
        mineralCollection: resolve(
          __dirname,
          "src/mineral_collection/index.html"
        ),
        // auth: resolve(__dirname, "src/auth/index.html"),
      },
    },
  },
});
