import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

const POSTS_STORE_KEY = 'posts';
const CO2_STORE_KEY = 'co2';

export const useStatistics = () => {
  const [postsCreated, setPostsCreated] = useState(0);
  const [co2Saved, setCo2Saved] = useState(0);

  const getDataFromStorage = useCallback(async () => {
    const posts = await AsyncStorage.getItem(POSTS_STORE_KEY);
    const co2 = await AsyncStorage.getItem(CO2_STORE_KEY);
    // AsyncStorage.setItem(CO2_STORE_KEY, String(0));
    // AsyncStorage.setItem(POSTS_STORE_KEY, String(0));
    setPostsCreated(Number(posts || 0));
    setCo2Saved(Number(co2 || 0));
  }, []);

  useEffect(() => {
    getDataFromStorage();
  }, [getDataFromStorage]);

  const updatePostsCreated = useCallback(() => {
    const newPostsNumber = postsCreated + 1;
    setPostsCreated(newPostsNumber);
    AsyncStorage.setItem(POSTS_STORE_KEY, String(newPostsNumber));

    console.log({ newPostsNumber, postsCreated });
  }, [postsCreated, setPostsCreated]);

  const updateCo2Saved = useCallback(
    (co2: number) => {
      const newCo2Number = co2Saved + co2;
      setCo2Saved(newCo2Number);
      AsyncStorage.setItem(CO2_STORE_KEY, String(newCo2Number));
    },
    [co2Saved, setCo2Saved],
  );

  return {
    postsCreated,
    co2Saved,
    updatePostsCreated,
    updateCo2Saved,
  };
};
