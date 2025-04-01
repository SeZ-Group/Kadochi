import 'dotenv/config';

export default {
  expo: {
    name: "Kadopych",
    slug: "kadopych",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./app/assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./app/assets/icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    extra: {
      eas: {
        projectId: "bfb0dd8a-08f4-49f1-a6a3-c3111150a1bc"
      }
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./app/assets/icon.png",
        backgroundColor: "#ffffff"
      },
       package: "com.kadopych"

    },
    web: {
      favicon: "./app/assets/favicon.png"
    },
    plugins: [
      "expo-font"
    ]
  }
};
