import React from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';

interface InputProps extends TextInputProps {
  onTextChange: (text: string) => void;
  text: string;
}

const Input: React.FC<InputProps> = ({ onTextChange, text, ...props }) => {
  return (
    <TextInput
      style={styles.input}
      onChangeText={onTextChange}
      multiline
      value={text}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginBottom: 10,
  },
});

export default Input;
