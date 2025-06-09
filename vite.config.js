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
        about: resolve(__dirname, "src/about/index.html"),
        contact: resolve(__dirname, "src/contact/index.html"),
      },
    },
  },
});
