import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity as CustomTouchable,
  Dimensions,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
import { useStore } from '../FishingExpeditionStore/iceMapFishingExpeditionContext';
import FishingExpeditionCustomBackground from '../FishingExpeditionCustomComponents/FishingExpeditionCustomBackground';

const { height } = Dimensions.get('window');

export default function IceMapFishingExpeditionSettings() {
  const navigation = useNavigation();
  const [iceMapShowIntro, setIceMapShowIntro] = useState(true);

  const { isEnabledIceMapMusic, setIsEnabledIceMapMusic } = useStore();

  const iceMapToggleMusic = async value => {
    await AsyncStorage.setItem('icemapmusic', JSON.stringify(value));
    setIsEnabledIceMapMusic(value);
  };

  const iceMapDeleteAllSaved = async () => {
    await AsyncStorage.removeItem('IceMapFavorites');
    navigation.goBack();
  };

  return (
    <FishingExpeditionCustomBackground>
      <View style={styles.iceMapContainer}>
        <View style={styles.iceMapHeaderRow}>
          <CustomTouchable
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Image source={require('../../assets/images/icemapbackbtn.png')} />
          </CustomTouchable>

          <Text style={styles.iceMapHeaderTitle}>SETTINGS</Text>
        </View>

        {iceMapShowIntro && (
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../../assets/images/icemaprules.png')}
              style={{ top: 20 }}
            />

            <ImageBackground
              source={require('../../assets/images/icemaprulescard.png')}
              style={styles.iceMapIntroCard}
            >
              <View
                style={{
                  paddingTop: 30,
                  alignItems: 'center',
                  paddingHorizontal: 20,
                }}
              >
                <Text style={styles.iceMapIntroText}>
                  Here you can customize the app for yourself
                </Text>

                <CustomTouchable
                  onPress={() => setIceMapShowIntro(false)}
                  activeOpacity={0.9}
                >
                  <ImageBackground
                    source={require('../../assets/images/icemapconfbtn.png')}
                    style={styles.iceMapOkayBtn}
                  >
                    <Text style={styles.iceMapOkayText}>OKAY</Text>
                  </ImageBackground>
                </CustomTouchable>
              </View>
            </ImageBackground>
          </View>
        )}

        {!iceMapShowIntro && (
          <View style={{ alignItems: 'center' }}>
            {Platform.OS === 'ios' && (
              <ImageBackground
                source={require('../../assets/images/icemaprulescard.png')}
                style={styles.iceMapSettingsCard}
              >
                <Text style={styles.iceMapSettingsTitle}>MELODY</Text>

                <CustomTouchable
                  onPress={() => iceMapToggleMusic(!isEnabledIceMapMusic)}
                  activeOpacity={0.8}
                >
                  <ImageBackground
                    source={require('../../assets/images/icemapconfbtn.png')}
                    style={[
                      styles.iceMapMelodyBtn,
                      !isEnabledIceMapMusic && { opacity: 0.7 },
                    ]}
                  >
                    <Text style={styles.iceMapMelodyText}>
                      {isEnabledIceMapMusic ? 'ON' : 'OFF'}
                    </Text>
                  </ImageBackground>
                </CustomTouchable>
              </ImageBackground>
            )}

            <ImageBackground
              source={require('../../assets/images/icemaprulescard.png')}
              style={styles.iceMapSettingsCard}
            >
              <Text style={styles.iceMapSettingsTitle}>Delete all saved</Text>

              <CustomTouchable
                onPress={iceMapDeleteAllSaved}
                activeOpacity={0.8}
              >
                <ImageBackground
                  source={require('../../assets/images/icemapconfbtn.png')}
                  style={styles.iceMapDeleteBtn}
                >
                  <Text style={styles.iceMapDeleteText}>Delete</Text>
                </ImageBackground>
              </CustomTouchable>
            </ImageBackground>
          </View>
        )}
      </View>
    </FishingExpeditionCustomBackground>
  );
}

const styles = StyleSheet.create({
  iceMapContainer: {
    flex: 1,
    paddingTop: height * 0.05,
    alignItems: 'center',
    paddingBottom: 20,
  },
  iceMapHeaderRow: {
    flexDirection: 'row',
    width: '88%',
    alignItems: 'center',
    marginBottom: 25,
  },
  iceMapHeaderTitle: {
    fontSize: 32,
    color: '#fff',
    marginLeft: 10,
    fontFamily: 'PassionOne-Regular',
  },
  iceMapIntroCard: {
    width: 356,
    minHeight: 300,
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iceMapIntroText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'PassionOne-Regular',
  },
  iceMapOkayBtn: {
    width: 205,
    height: 89,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iceMapOkayText: {
    fontSize: 25,
    color: '#fff',
    fontFamily: 'PassionOne-Regular',
  },
  iceMapSettingsCard: {
    width: 356,
    minHeight: 306,
    paddingTop: 40,
    paddingBottom: 30,
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
  },
  iceMapSettingsTitle: {
    fontSize: 28,
    color: '#000',
    fontFamily: 'PassionOne-Regular',
    marginBottom: 20,
  },
  iceMapMelodyBtn: {
    width: 205,
    height: 89,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iceMapMelodyText: {
    fontSize: 28,
    color: '#fff',
    fontFamily: 'PassionOne-Regular',
  },
  iceMapDeleteBtn: {
    width: 205,
    height: 89,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iceMapDeleteText: {
    fontSize: 27,
    color: '#fff',
    fontFamily: 'PassionOne-Regular',
  },
});
