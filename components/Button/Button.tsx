import React from 'react';
import { TouchableOpacity, View, TouchableOpacityProps, StyleSheet } from 'react-native';
import { StyledText, FontSize, FontFamily } from '../StyledText';
import Colors from '../../constants/Colors';

export enum ButtonType {
  primary = 'primaryGreen',
  secondary = 'lightGreen',
  white = 'white',
}

interface ButtonProps extends TouchableOpacityProps {
  type?: ButtonType;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ type, text, style, ...props }) => {
  return (
    <>
      <TouchableOpacity
        {...props}
        style={[
          styles.button,
          { backgroundColor: type ? Colors[type] : Colors.lightGreen },
          style,
        ]}>
        <StyledText fontSize={FontSize.f18} fontFamily={FontFamily.LatoBold}>
          {text}
        </StyledText>
      </TouchableOpacity>
      <View style={styles.blackShadow} />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 17,
    paddingHorizontal: 24,
    backgroundColor: Colors.primaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1,
    borderWidth: 2,
    borderColor: '#2C2C2C',
  },
  blackShadow: {
    flex: 1,
    zIndex: 100,
  },
});

export default Button;
