import React, { useCallback, useMemo, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import ImagePickerComponent from '../../ImagePickerComponent/ImagePickerComponent';
import InputDescription from '../../InputDescription/InputDescription';
import Button, { ButtonType } from '../../Button/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../../constants/Colors';
import CO2Component from '../../CO2Component/CO2Component';
import { ShareDialog } from 'react-native-fbsdk-next';
import calculateCO2Savings from '../../utils';
import { useStatistics } from '../../../utils/useStatistics';
import { useRouter } from 'expo-router';
import { useStatsContext } from '../../../app/_layout';

function GenerateDescriptionScreen() {
  const [text, setText] = useState('');
  const router = useRouter();
  const [selectedImageUri, setSelectedImageUri] = useState('');
  const [CO2, setCO2] = useState(0);
  const [totalWeight, setTotalWeight] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { updateCo2Saved, updatePostsCreated } = useStatsContext();

  const queryOpenAI = async (labels: any) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        'url to azure',
        {
          method: 'POST',
          // @ts-ignore-next-line
          timeout: 8000,
          // @ts-ignore-next-line
          headers: {
            'Content-Type': 'application/json',
            'api-key': '',
          },
          body: JSON.stringify({
            messages: [
              {
                role: 'system',
                content: `
                You will have 4 tasks to perform one by one. 
                Result of each task should be a separate key in the output json. 
                \nTask 1: 
                Your input is a json from Google Cloud Vision API. 
                The object on the pictures that was sent to Google Cloud Vision API 
                is an used product that a user wants to give away for free. 
                There may be more than one object on the picture. 
                Filter out things like floor, people and other irrelevant objects. 
                You are mainly interested in toys, cloths, furniture, books, packaged food, 
                tools, shoes, household appliances and decoration objects 
                but also other objects that people not longer need but that may still present some value for others. 
                Your task it to find one or more relevant objects and return it in Polish under key \"title\" in the output json. 
                If you are not sure if an object is relevant, don't include it, but try to find at least one relevant object. 
            
                \nTask 2: 
                Use your knowledge from the previous task to create a text in Polish for posting on Facebook. 
                The text should contain a description and a few encouraging words. 
                If the prompt contains user input delimited with """, reword it and include it in the output. 
                The user may for example provide information about the location, time of the day or other conditions. 
                You can use emoji. 
                Use only Polish. 
                Domyślnie używaj żeńskiej formy gramatycznej. 
                Return the text under key \"description\" in the output json. 
            
                \nTask 3:
                Use your knowledge from the previous tasks to estimate total weight of the relevant objects. 
                If you know a range of possible weights, return the mean. 
                If there are multiple objects, return the sum of their weights. 
                Return the weight in kilograms under key \"total_weight\" in the output json. 
            
                \nTask 4: "
                Use your knowledge from the previous tasks to estimate what materials or substances 
                and in what quantity were used to produce the relevant objects. 
                Choose from the following list: 
                [plastic, cotton, wood, paper, aluminum, steel, leather, glass, 
                ceramic, rubber, silk, wool, polyester, nylon, brass, copper, bamboo, 
                concrete, polyurethane foam, memory foam, latex foam, 
                juice, milk, coke, wheat, chocolate, sugar, water]. 
                Return the list of materials or substances under key \"content\" in the output json. 
                List each material or substance as a key and its amount in kg as a value. 
                Don't use other materials or substances that are not in the above list, 
                you can return 'other' in such a case. 
                Do not include materials that are not present in the object.`,
              },
              {
                role: 'user',
                content: JSON.stringify(labels),
              },
            ],
          }),
        },
      );
      const json = await response.json();


      const thing = JSON.parse(json.choices[0].message.content);
      console.log(thing);
      console.warn(thing.total_weight);
      console.warn(thing.content);
      setText(thing.description);
      setTotalWeight(thing.total_weight);

      const CO2savings = calculateCO2Savings(thing.content);

      setCO2(parseFloat(CO2savings.toFixed(2)) + 0.1);

      return thing.description;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const sharePhotoContent = useMemo(
    () => ({
      contentType: 'photo',
      photos: [{ imageUrl: selectedImageUri }],
    }),
    [selectedImageUri],
  );

  const handleSuccess = useCallback(() => {
    updatePostsCreated();
    updateCo2Saved(CO2);
    router.back();
  }, [updatePostsCreated, updateCo2Saved, CO2, router]);

  const handleFacebookShare = useCallback(async () => {
    await handleCopy();
    await ShareDialog.show(sharePhotoContent);
    Alert.alert(
      'Czy udało się udostępnić?',
      'Potwierdz udostępnienie, abyśmy mogli zapisać Twój wkład w statystykach 🌿✨',
      [
        {
          text: 'Nie',
          style: 'destructive',
        },
        {
          text: 'Tak',
          onPress: handleSuccess,
          style: 'default',
        },
      ],
    );
  }, [sharePhotoContent, handleSuccess]);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(text);
  };

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ImagePickerComponent
          onLabelsFetched={(labels: any) => queryOpenAI(labels)}
          onImageLoaded={setSelectedImageUri}
        />
        <InputDescription onTextChange={setText} text={text} isLoading={isLoading} />
        <CO2Component CO2={CO2} totalWeight={totalWeight} />
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <Button text='Kopiuj tekst' onPress={handleCopy} type={ButtonType.white} />
        <Button text='Udostępnij na FB' onPress={handleFacebookShare} type={ButtonType.primary} />
      </View>
    </SafeAreaView>
  );
}

export default GenerateDescriptionScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollView: {
    padding: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 5,
    borderTopWidth: 1,
    borderTopColor: Colors.black,
  },
});
