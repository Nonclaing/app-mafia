module.exports = {
  apps: [
    {
      name: "app.nuxt.skeleton",
      script: ".output/server/index.mjs",
      env: {
        NUXT_API_BASE_URL: "https://localhost:3000",
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
