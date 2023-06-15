import React from 'react';
import { TextInput, ViewProps, StyleSheet } from 'react-native';

import Button, { ButtonType } from '../Button/Button';
import { StyledText, FontSize, FontFamily } from '../StyledText';

interface CO2ComponentProps extends ViewProps {
  CO2: number,
  totalWeight: string,
}

const CO2Component: React.FC<CO2ComponentProps> = ({ CO2, totalWeight, ...props }) => {
  return (
    <>
      <StyledText fontFamily={FontFamily.LatoBold} fontSize={FontSize.f18} style={{ marginBottom: 8 }}>Twój impakt na środowisko</StyledText>
      <Button type={ButtonType.primary} text={`Zaoszczędzone CO2: ${CO2} kg`} disabled style={{ marginBottom: 8 }} />
      <Button text={`Waga przedmiotów: ${totalWeight || 0} kg`} disabled />
    </>
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

export default CO2Component;
