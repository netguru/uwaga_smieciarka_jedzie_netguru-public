import React from 'react';
import { Stack } from 'expo-router';
import GenerateDescriptionScreen from "../components/screens/GenerateDescriptionScreen/GenerateDescriptionScreen";

type Props = {};

const GenerateDescription = (props: Props) => {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Generowanie opisu',
        }}
      />
        <GenerateDescriptionScreen />
    </>
  );
};

export default GenerateDescription;
