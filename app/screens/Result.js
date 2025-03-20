import React from "react";
import { ScrollView, View, ImageBackground } from "react-native";
import ProductCard from '../components/ProductCard';


const products = [
  {
    image: require("../assets/1.jpg"),
    title: "کلاس نقاشی یک روزه",
    description: "ورکشاپ یک روزه نقاشی",
  },
  {
    image: require("../assets/2.jpg"),
    title: "لوازم نقاشی رنگ روغن",
    description: "پوالت و قلم مو از ابزارهای اصلی و ضروری در نقاشی رنگ روغن به شمار می‌روند که کار با رنگ‌ها و ایجاد اثر هنری به وسیله آن‌ها صورت می‌گیرد.",
  },
  {
    image: require("../assets/3.jpg"),
    title: "بوم نقاشی چوبی قابل حمل",
    description: "پایه بوم به عنوان یکی از ابزارهای اصلی در نقاشی شناخته می‌شود که بر اساس جنس و مصالح مختلف ساخته می‌شود.",
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
    justifyContent: "flex-start", // Aligns content from the top
    alignItems: "center",
    paddingTop: 200, // Moves content down (adjust this value)
  },
  scrollContainer: {
    alignItems: "center", // Centers items inside ScrollView horizontally
    justifyContent: "flex-start", // Prevents sticking to the top
    paddingTop: 50, // Moves cards further down
  },
};

export default ProductScreen;