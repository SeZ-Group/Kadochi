import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

function AnswerBox({ text, selectedOption, setSelectedOption, optionKey, isMultiSelect }) {
  const isSelected = isMultiSelect ? selectedOption.includes(optionKey) : selectedOption === optionKey;

  return (
    <TouchableOpacity
      style={[
        styles.textBox, 
        isSelected && styles.selectedOption
      ]}
      onPress={() => {
        if (isMultiSelect) {
          setSelectedOption(prev =>
            prev.includes(optionKey) ? prev.filter(key => key !== optionKey) : [...prev, optionKey]
          );
        } else {
          setSelectedOption(optionKey);
        }
      }}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  textBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%', 
    height: '100%', 
  },
  text: {
    padding: 10,
    fontSize: 16,
    fontFamily: 'Yaghut',
    textAlign: 'right',
    color: '#000',
    writingDirection: 'rtl',
  },
  selectedOption: {
    backgroundColor: 'rgba(171, 209, 198, 1)',
  }
});

export default AnswerBox;
