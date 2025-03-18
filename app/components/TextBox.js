  import React from 'react'
  import { View, StyleSheet, Text } from 'react-native';

  function TextBox({ text = '', fontSize = 20 }) {
    return (
      <View style={styles.textBox}>
        <Text style={{ padding: 10, fontFamily: 'Yaghut', fontSize: fontSize, textAlign: 'right' }}>{text}</Text>
        {/* <Text style={[styles.text, { fontSize, fontFamily: 'Yaghut' }]}>{text}</Text> */}
      </View>
    )
  }

  const styles = StyleSheet.create({
    textBox: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        alignItems: 'right',
        justifyContent: 'center',
        flex: 1,
        width: '100%', 
        height: '100%', 
    },
    text: {
        padding: 10,
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'right',
    },
  });

  export default TextBox;
