import { Text, TextProps } from 'react-native';

export enum FontSize {
  /** Section title, main buttons, eg "Dodaj zdjęcie" */
  f18 = 18,
  /** Screen title, eg "Generowanie obrazu" */
  f22 = 22,
  /** Input */
  f16 = 16,
  /** Regular */
  f14 = 14,
  f12 = 12,

  /** Big screen title */
  f48 = 48,
  f36 = 36,
}

export enum FontFamily {
  LatoLight = 'LatoLight',
  LatoRegular = 'LatoRegular',
  LatoBold = 'LatoBold',
  LatoBlack = 'LatoBlack',
}

type Props = TextProps & {
  fontSize?: FontSize;
  fontFamily?: FontFamily;
};

export function StyledText(props: Props) {
  const { fontSize, fontFamily, style, ...restProps } = props;
  return (
    <Text
      {...restProps}
      style={[
        style,
        { fontFamily: fontFamily || FontFamily.LatoRegular, fontSize: fontSize || FontSize.f14 },
      ]}
    />
  );
}
