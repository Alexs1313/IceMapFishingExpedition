import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FishingExpeditionCustomBackground from './FishingExpeditionCustomBackground';

const { height } = Dimensions.get('window');

const FishingExpeditionCustomLoader = () => {
  const helicopterY = useRef(new Animated.Value(height * 0.1)).current;
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('IceMapFishingExpeditionOnboard');
    }, 3500);
  }, []);

  useEffect(() => {
    Animated.timing(helicopterY, {
      toValue: -900,
      duration: 4500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <FishingExpeditionCustomBackground>
      <View style={styles.loadercnt}>
        <Animated.Image
          source={require('../../assets/images/icemapldr.png')}
          style={[
            styles.helicopter,
            {
              transform: [{ translateY: helicopterY }],
            },
          ]}
          resizeMode="contain"
        />
      </View>
    </FishingExpeditionCustomBackground>
  );
};

const styles = StyleSheet.create({
  loadercnt: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden',
    height: 600,
  },
  helicopter: {
    bottom: 60,
  },
});

export default FishingExpeditionCustomLoader;
