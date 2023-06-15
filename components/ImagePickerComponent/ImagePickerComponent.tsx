import React, { useState } from 'react';
import { Image, View, StyleSheet, Text, Pressable, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontFamily, FontSize, StyledText } from '../StyledText';

const fetchLabelsForImage = async (image_base64: any) => {
  const API_KEY = '';
  const url = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

  const requestPayload = {
    requests: [
      {
        image: {
          content: image_base64,
        },
        features: [
          {
            type: 'LABEL_DETECTION',
            maxResults: 8,
          },
          {
            type: 'OBJECT_LOCALIZATION',
            maxResults: 8,
          },
          {
            type: 'LOGO_DETECTION',
            maxResults: 8,
          },
        ],
      },
    ],
  };

  const response = await fetch(url, {
    method: 'POST',
    // @ts-ignore
    timeout: 8000,
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(requestPayload),
  });

  const labels = await response.json();

  return labels.responses[0].labelAnnotations;
};

export default function ImagePickerComponent({ onLabelsFetched, onImageLoaded }: any) {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    setIsLoading(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    onImageLoaded(result.assets[0].uri);

    setIsLoading(false);

    // @ts-ignore-next-line
    const image_base64 = result.assets[0].base64;

    if (!result.canceled) {
      // @ts-ignore-next-line
      setImage(result.assets[0].uri);
    }

    try {
      const labels = await fetchLabelsForImage(image_base64);
      onLabelsFetched(labels);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View>
      {!image && (
        <StyledText
          fontSize={FontSize.f18}
          fontFamily={FontFamily.LatoBold}
          style={styles.addPictureLabel}>
          Dodaj zdjęcie
        </StyledText>
      )}
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Pressable onPress={pickImage} style={styles.imagePressable}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <StyledText fontSize={FontSize.f14} fontFamily={FontFamily.LatoRegular}>
              + Dodaj zdjęcie
            </StyledText>
          )}
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  addPictureLabel: {
    marginBottom: 16,
  },
  imagePressable: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  image: {
    width: 200,
    height: 200,
  },
});
