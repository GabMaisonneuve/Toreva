import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  // console.log("Variables chargées :", loadEnv(mode, process.cwd()));
  const env = loadEnv(mode, process.cwd());
  console.log(env);
  return {
    root: env.VITE_ROOT_DIR || "./src",
    build: {
      outDir: env.VITE_BUILD_DIR || "dist",
      emptyOutDir: env.VITE_CLEAN_BUILD === "true",
      rollupOptions: {
        input: {
          index: resolve(__dirname, "src/index.html"),
          form: resolve(__dirname, "src/form/form.html"),
          contact: resolve(__dirname, "src/contact/contact.html"),
        },
      },
    },
  };
});
