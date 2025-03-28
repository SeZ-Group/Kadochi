  import React from 'react'
  import { View, StyleSheet, Text } from 'react-native';

  function TextBox({ text = '', fontSize = 15 }) {
    return (
      <View style={styles.textBox}>
        <Text style={{ padding: 20, fontFamily: 'Yaghut', fontSize: fontSize, textAlign: 'right' }}>{text}</Text>
        {/* <Text style={[styles.text, { fontSize, fontFamily: 'Yaghut' }]}>{text}</Text> */}
      </View>
    )
  }

  const styles = StyleSheet.create({
    textBox: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        alignItems: 'right',
        justifyContent: 'center',
        flex: 1,
        width: '100%', 
        height: '100%', 
    },
    text: {
        padding: 10,
        fontSize: 10,
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'right',
        
    },
  });

  export default TextBox;
