import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ProductCard = ({ image, title, description }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    elevation: 5, // For shadow on Android
    shadowColor: "#000", // For shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    margin: 10,
    width: 200, // Adjust as needed
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});

export default ProductCard;
