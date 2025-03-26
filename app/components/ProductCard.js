import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

// Get device width for responsive sizing
const { width } = Dimensions.get("window");

const ProductCard = ({ image, title, description, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.card}>
        <Image 
          source={{ uri: image }}
          style={styles.image}
          onError={(e) => console.log("Image failed to load", e.nativeEvent.error)}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    alignItems: "flex-start", // Aligns children from the left
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    margin: 10,

    // Increased width & decreased height
    width: width * 0.8, // 80% of screen width
    height: 120, // Reduced height
    flexDirection: "row", // Align items horizontally (image + text)
    alignItems: "center", // Vertically center items inside the row
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15, // Space between image and text
  },
  textContainer: {
    flex: 1, // Takes the remaining space for the title and description
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left", // Align the title to the left
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "left", // Align the description to the left
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
});

export default ProductCard;
