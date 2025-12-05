import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, Easing } from 'react-native';
import IceMapFishingExpeditionLayout from './IceMapFishingExpeditionLayout';

const { height } = Dimensions.get('window');

const IceMapFishingExpeditionLoader = () => {
  const helicopterY = useRef(new Animated.Value(height * 0.1)).current;

  useEffect(() => {
    Animated.timing(helicopterY, {
      toValue: -900,
      duration: 4500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <IceMapFishingExpeditionLayout>
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
    </IceMapFishingExpeditionLayout>
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

export default IceMapFishingExpeditionLoader;
