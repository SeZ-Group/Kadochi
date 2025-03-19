import React from "react";
import { ScrollView, View } from "react-native";
import ProductCard from '../components/ProductCard';


const products = [
    {
      image: "https://via.placeholder.com/100",
      title: "Product 1",
      description: "This is a great product.",
    },
    {
      image: "https://via.placeholder.com/100",
      title: "Product 2",
      description: "Another amazing item.",
    },
    {
      image: "https://via.placeholder.com/100",
      title: "Product 3",
      description: "A must-have gadget.",
    },
  ];
  
  const ProductScreen = () => {
    return (
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
    );
  };
  
  const styles = {
    container: {
      flex: 1,
      justifyContent: "center", // Centers vertically
      alignItems: "center", // Centers horizontally
    },
    scrollContainer: {
      alignItems: "center", // Centers items inside ScrollView horizontally
      justifyContent: "center", // Optional: Centers if ScrollView doesn't exceed screen height
    },
  };
  
  export default ProductScreen;