// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  imports: {
    presets: [
      {
        from: 'lodash.debounce',
        imports: [
          {
            name: 'default',
            as: 'debounce',
          },
        ],
      },
    ],
  },
  modules: ['@nuxt/eslint', '@nuxt/image'],
   css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
