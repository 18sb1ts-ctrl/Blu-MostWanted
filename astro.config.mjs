// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import wix from "@wix/astro";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://YOURUSERNAME.github.io",
  base: "/Blu-MostWanted/",

  output: "static",

  integrations: [
    tailwind(),

    wix({
      htmlEmbeds: true,
      auth: false,
    }),

    react(),
  ],

  vite: {
    cacheDir: "node_modules/.cache/.vite",
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "zustand",
        "framer-motion",
        "date-fns",
        "clsx",
        "class-variance-authority",
        "tailwind-merge",
        "@radix-ui/*",
        "@wix/*",
        "zod",
      ],
    },
  },

  devToolbar: {
    enabled: false,
  },

  image: {
    domains: ["static.wixstatic.com"],
  },

  server: {
    allowedHosts: true,
    host: true,
  },

  security: {
    checkOrigin: false,
  },
});
