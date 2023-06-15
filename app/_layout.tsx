import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { createContext, useContext, useEffect } from 'react';
import Colors from '../constants/Colors';
import { FontFamily, FontSize } from '../components/StyledText';
import { useStatistics } from '../utils/useStatistics';
import { StatusBar } from 'react-native';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const Context = createContext();

export const useStatsContext = () => useContext(Context);

const ContextProvider = ({ children }) => {
  const { co2Saved, postsCreated, updateCo2Saved, updatePostsCreated } = useStatistics();

  return (
    <Context.Provider value={{ postsCreated, co2Saved, updatePostsCreated, updateCo2Saved }}>
      {children}
    </Context.Provider>
  );
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    [FontFamily.LatoLight]: require('../assets/fonts/Lato-Light.ttf'),
    [FontFamily.LatoRegular]: require('../assets/fonts/Lato-Regular.ttf'),
    [FontFamily.LatoBold]: require('../assets/fonts/Lato-Bold.ttf'),
    [FontFamily.LatoBlack]: require('../assets/fonts/Lato-Black.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {
  return (
    <ContextProvider>
      <StatusBar barStyle="dark-content" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.background,
          },
          contentStyle: {
            backgroundColor: Colors.background,
          },
          headerBackTitleVisible: false,
          headerTintColor: Colors.black,
          headerTitleStyle: {
            fontFamily: FontFamily.LatoRegular,
            fontSize: FontSize.f22,
          },
        }}
      />
    </ContextProvider>
  );
}
