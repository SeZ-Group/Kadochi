import 'dotenv/config';

export default {
  expo: {
    name: "kadochi",
    slug: "kadochi",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./app/assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./app/assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    extra: {
      API_KEY: process.env.API_KEY,
      API_BASE_URL: process.env.API_BASE_URL
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./app/assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      favicon: "./app/assets/favicon.png"
    },
    plugins: [
      "expo-font"
    ]
  }
};

console.log("🧪 API_KEY FROM .env:", process.env.API_KEY);
console.log("🧪 BASE_URL FROM .env:", process.env.API_BASE_URL);
