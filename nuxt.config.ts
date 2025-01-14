// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    // other modules...
  ],
  // Optionally configure the module if needed
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', 
      // automatically imports `storeToRefs`
      'storeToRefs'
    ],
  },
  css: [
    '@/assets/styles.css' // percorso relativo al file
  ],
})
