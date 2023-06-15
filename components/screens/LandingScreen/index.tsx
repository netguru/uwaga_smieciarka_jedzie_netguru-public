import { View, Text, SafeAreaView, Image } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { styles } from './styles';
import { FontFamily, FontSize, StyledText } from '../../StyledText';
import Button from '../../Button/Button';
import { useStatistics } from '../../../utils/useStatistics';
import { useStatsContext } from '../../../app/_layout';

const LandingScreen = () => {
  const router = useRouter();
  const { co2Saved, postsCreated } = useStatsContext();

  const goToGenerateDescription = useCallback(() => {
    router.push('generate_description');
  }, [router]);

  useEffect(() => {

  }, [])

  return (
    <SafeAreaView>
      <View style={styles.headImageWrapper}>
        <Image
          style={styles.headImage}
          source={require('../../../assets/images/usj.png')}
          resizeMode='contain'
        />
        <View style={styles.headGreenUnderImage} />
      </View>
      <StyledText fontSize={FontSize.f36} style={styles.title}>
        <StyledText fontSize={FontSize.f48} fontFamily={FontFamily.LatoBold}>
          Hej,
        </StyledText>
        {'\n'}
        super, że jesteś!
      </StyledText>
      <Button
        onPress={goToGenerateDescription}
        text='Przejdź do generowania tekstu'
        style={{ marginHorizontal: 20 }}
      />
      <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
        <StyledText fontSize={FontSize.f14} style={{ textAlign: 'center' }}>
          Wygenerowałeś już <StyledText fontFamily={FontFamily.LatoBold}>{postsCreated}</StyledText>{' '}
          opisów, co przekłada się na oszczędność{' '}
          <StyledText fontFamily={FontFamily.LatoBold}>{co2Saved} kg</StyledText> CO2!
        </StyledText>
      </View>
    </SafeAreaView>
  );
};

export default LandingScreen;
