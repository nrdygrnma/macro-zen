// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/ui",
    "@pinia/nuxt",
    "nuxt-auth-utils",
    "@prisma/nuxt",
    "nuxt-echarts",
  ],

  echarts: {
    renderer: ["svg", "canvas"],
    charts: ["BarChart", "LineChart", "PieChart"],
    components: [
      "TitleComponent",
      "TooltipComponent",
      "GridComponent",
      "DatasetComponent",
    ],
    features: ["LabelLayout", "UniversalTransition"],
  },

  css: ["~/assets/css/main.css"],

  app: {
    pageTransition: {
      name: "fade",
      mode: "out-in",
    },
    layoutTransition: {
      name: "slide",
      mode: "out-in",
    },
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
  future: {
    compatibilityVersion: 4,
  },
});
