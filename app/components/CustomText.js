// app/components/CustomText.js
import React from 'react';
import { Text } from 'react-native';

const CustomText = ({ style, children, ...props }) => {
  return (
    <Text style={[{ fontFamily: 'Nadine' }, style]} {...props}>
      {children}
    </Text>
  );
};

export default CustomText;
