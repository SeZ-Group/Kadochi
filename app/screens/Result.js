import React from "react";
import { ScrollView, View, Linking, ImageBackground, Image, Text } from "react-native";
import ProductCard from '../components/ProductCard';
import { Colors } from '../assets/Colors';
import axios from 'axios';

const ProductScreen = ({ route }) => {
  const { giftSuggestion } = route.params;
  let parsedSuggestions = [];

  let products = [];

  try {
    parsedSuggestions = typeof giftSuggestion === 'string'
      ? JSON.parse(giftSuggestion)
      : giftSuggestion;
  
    if (Array.isArray(parsedSuggestions)) {
      products = parsedSuggestions.map(item => ({
        title: item["title"],
        image: item["image_url"],
        description: item["description"],
        url: item["product_url"]
      }));
    } else {
      console.error("parsedSuggestions is not an array:", parsedSuggestions);
      alert("مشکلی پیش اومده و فعلا نمیتونیم جوابگو باشیم. اگه میشه چند دقیقه دیگه دوباره تلاش کن.");
    }
  } catch (error) {
    console.error("Failed to parse giftSuggestion:", error);
    alert("مشکلی پیش اومده و فعلا نمیتونیم جوابگو باشیم. اگه میشه چند دقیقه دیگه دوباره تلاش کن.");
  }

  const handleCardPress = async (index) => {
    const selectedProduct = parsedSuggestions[index];
  
    try {
      await axios.post('https://kadopych.ir/api/click/', {
        suggestion_id: selectedProduct.id
      });
      console.log("Click registered for suggestion:", selectedProduct.id);
    } catch (error) {
      console.error("Error registering click:", error);
    }
  
    if (selectedProduct.product_url) {
      Linking.openURL(selectedProduct.product_url)
        .catch(err => console.error("Failed to open URL:", err));
    }
  };

  return (
    <ImageBackground
            source={require('../assets/bg.jpg')}
            style={styles.imageBackground}
        >
      <View style={styles.overlay}>
        <View style={styles.topContainer}>
          <View style={styles.header}>
              <Image source={require('../assets/best-logo.png')} style={styles.logo} />
              <Text style={styles.title}>کادوپیچ</Text>
          </View>
        </View>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {products.map((product, index) => (
              <ProductCard 
                key={index}
                image={product.image}
                title={product.title}
                description={product.description}
                onPress={() => handleCardPress(index)}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = {
  topContainer: {
    flex: 1,
  },
  container: {
    flex: 2,
    justifyContent: "flex-start", 
    alignItems: "center",
    backgroundColor: Colors.background,
    padding: 10,
    zIndex: 1,
    overflow: 'hidden', 
    borderRadius: 20,
    marginTop: 70,      // more space on top
    marginBottom: 30,   // more space at bottom
    marginHorizontal: 20, // keeps the same side spacing as before
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    width: '100%',
    backgroundColor: `${Colors.primary}80`,
    justifyContent: 'center',
    alignItems: 'center',
},
  scrollContainer: {
    alignItems: "center", // Centers items inside ScrollView horizontally
    justifyContent: "flex-start", // Prevents sticking to the top
    // paddingTop: 10, // Moves cards further down
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
      flex: 1,
      width: '100%',
      backgroundColor: `${Colors.primary}80`,
      justifyContent: 'center',
      alignItems: 'center',
  },
  header: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 80,
      marginBottom: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 100,
      width: 160,
      height: 160,
      position: 'relative', // make it a positioned container
  },
  logo: {
      width: 95,
      height: 95,
      resizeMode: 'contain',
  },
  title: {
      position: 'absolute',
      bottom: '8%',
      right: '20%',
      fontSize: 14,
      color: '#F8C660',
      fontFamily: 'Yaghut',
      textAlign: 'right',
      writingDirection: 'rtl',
  },
};

export default ProductScreen;