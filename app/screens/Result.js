import React from "react";
import { ScrollView, View, ImageBackground } from "react-native";
import ProductCard from '../components/ProductCard';
import { Colors } from '../assets/Colors';


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
        title: item["product-title"],
        image: item["product-image"],
        description: item["product-description"]
      }));
    } else {
      console.error("parsedSuggestions is not an array:", parsedSuggestions);
      alert("مشکلی پیش اومده و فعلا نمیتونیم جوابگو باشیم. اگه میشه چند دقیقه دیگه دوباره تلاش کن.");
    }
  } catch (error) {
    console.error("Failed to parse giftSuggestion:", error);
    alert("مشکلی پیش اومده و فعلا نمیتونیم جوابگو باشیم. اگه میشه چند دقیقه دیگه دوباره تلاش کن.");
  }
  

  return (

    <View style={styles.overlay}>
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {products.map((product, index) => (
          <ProductCard 
            key={index}
            image={product.image}
            title={product.title}
            description={product.description}
          />
        ))}
      </ScrollView>
      </View>
      </View>

  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: "flex-start", // Aligns content from the top
    alignItems: "center",
    paddingTop: 200, // Moves content down (adjust this value)
  },
  overlay: {
    flex: 1,
    width: '100%',
    backgroundColor: `${Colors.primary}95`,
    justifyContent: 'center',
    alignItems: 'center',
},
  scrollContainer: {
    alignItems: "center", // Centers items inside ScrollView horizontally
    justifyContent: "flex-start", // Prevents sticking to the top
    paddingTop: 50, // Moves cards further down
  },
};

export default ProductScreen;