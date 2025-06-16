import { resolve } from "path";
import { defineConfig, loadEnv } from "vite"; // Import loadEnv

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return {
    root: "src/",

    define: {
      // Expose VITE_API_TOKEN from the loaded environment variables
      // If VITE_API_TOKEN is not found, JSON.stringify(undefined) will make it 'undefined' in code.
      "import.meta.env.VITE_API_TOKEN": JSON.stringify(env.VITE_API_TOKEN),

      // Expose VITE_USER_ID
      "import.meta.env.VITE_USER_ID": JSON.stringify(env.VITE_USER_ID),

      // Expose VITE_SERVICE_ID (for EmailJS service ID)
      "import.meta.env.VITE_SERVICE_ID": JSON.stringify(env.VITE_SERVICE_ID),

      // Expose VITE_TEMPLATE_ID (for EmailJS template ID)
      "import.meta.env.VITE_TEMPLATE_ID": JSON.stringify(env.VITE_TEMPLATE_ID),
    },

    build: {
      outDir: "../dist", // Output directory for your built files
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
  };
});
