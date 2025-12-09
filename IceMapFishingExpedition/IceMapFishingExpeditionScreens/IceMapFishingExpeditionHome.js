import React, { useState, useEffect, useCallback } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IceMapFishingExpeditionLayout from '../IceMapFishingExpeditionComponents/IceMapFishingExpeditionLayout';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useStore } from '../IceMapFishingExpeditionStore/iceMapFishingExpeditionContext';
import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height } = Dimensions.get('window');

const IceMapFishingExpeditionHome = () => {
  const navigation = useNavigation();
  const { isEnabledIceMapMusic, setIsEnabledIceMapMusic } = useStore();

  const [iceMapTrackIndex, setIceMapTrackIndex] = useState(0);
  const [iceMapSound, setIceMapSound] = useState(null);

  const iceMapTracks = ['summer-nights-203094.mp3', 'summer-nights-203094.mp3'];

  useEffect(() => {
    iceMapPlayTrack(iceMapTrackIndex);

    return () => {
      if (iceMapSound) {
        iceMapSound.stop(() => {
          iceMapSound.release();
        });
      }
    };
  }, [iceMapTrackIndex]);

  const iceMapPlayTrack = index => {
    if (iceMapSound) {
      iceMapSound.stop(() => {
        iceMapSound.release();
      });
    }

    const iceMapTrackPath = iceMapTracks[index];

    const newSound = new Sound(iceMapTrackPath, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Error', error);
        return;
      }

      newSound.play(success => {
        if (success) {
          setIceMapTrackIndex(prev => (prev + 1) % iceMapTracks.length);
        }
      });

      setIceMapSound(newSound);
    });
  };

  useFocusEffect(
    useCallback(() => {
      iceMapLoadMusicState();
    }, []),
  );

  useEffect(() => {
    const iceMapApplyVolume = async () => {
      try {
        const stored = await AsyncStorage.getItem('icemapmusic');
        const parsed = JSON.parse(stored);
        setIsEnabledIceMapMusic(parsed);

        if (iceMapSound) {
          iceMapSound.setVolume(parsed ? 1 : 0);
        }
      } catch (e) {
        console.log('Error', e);
      }
    };

    iceMapApplyVolume();
  }, [iceMapSound]);

  useEffect(() => {
    if (iceMapSound) {
      iceMapSound.setVolume(isEnabledIceMapMusic ? 1 : 0);
    }
  }, [isEnabledIceMapMusic]);

  const iceMapLoadMusicState = async () => {
    try {
      const stored = await AsyncStorage.getItem('icemapmusic');
      const parsed = JSON.parse(stored);
      setIsEnabledIceMapMusic(parsed);
    } catch (e) {
      console.log('Error:', e);
    }
  };

  return (
    <IceMapFishingExpeditionLayout>
      <View style={styles.iceMapContainer}>
        <ImageBackground
          source={require('../../assets/images/icemapwlccnt.png')}
          style={styles.iceMapWelcomeCard}
        >
          <View style={styles.iceMapWelcomeCnt}>
            <View style={styles.iceMapHeaderWrapper}>
              <Image
                source={require('../../assets/images/icemapminilogo.png')}
              />

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate('IceMapFishingExpeditionSaved')
                }
              >
                <Image
                  source={require('../../assets/images/icemapsaved.png')}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.iceMapWelcomeTitle}>
              Ice Map Fishing Expedition is a winter travel guide with unique
              fishing locations around the world. Guide Aria Frostwell will give
              you tips, advice, and help you choose a spot on the map.
            </Text>
          </View>
        </ImageBackground>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('IceMapFishingExpeditionTips')}
        >
          <ImageBackground
            source={require('../../assets/images/icemaphometips.png')}
            style={styles.iceMapTipsBtn}
          />
        </TouchableOpacity>

        <View style={styles.iceMapButtonsWrapper}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('IceMapFishingExpeditionPlacesList')
            }
          >
            <ImageBackground
              source={require('../../assets/images/icemaphomebtn.png')}
              style={styles.iceMapBtn}
            >
              <Text style={styles.iceMapBtnTitle}>List of places</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('IceMapFishingExpeditionConduct')
            }
          >
            <ImageBackground
              source={require('../../assets/images/icemaphomebtn.png')}
              style={styles.iceMapBtn}
            >
              <Text style={styles.iceMapBtnTitle}>Rules of conduct</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('IceMapFishingExpeditionSettings')
            }
          >
            <ImageBackground
              source={require('../../assets/images/icemaphomebtn.png')}
              style={styles.iceMapBtn}
            >
              <Text style={styles.iceMapBtnTitle}>Settings</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    </IceMapFishingExpeditionLayout>
  );
};

const styles = StyleSheet.create({
  iceMapContainer: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: height * 0.06,
  },
  iceMapWelcomeCard: {
    alignItems: 'center',
    width: 366,
    height: 306,
  },
  iceMapWelcomeCnt: {
    alignItems: 'center',
    paddingHorizontal: 40,
    justifyContent: 'center',
    flex: 1,
  },
  iceMapWelcomeTitle: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'PassionOne-Regular',
  },
  iceMapHeaderWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 18,
  },
  iceMapBtn: {
    alignItems: 'center',
    width: 205,
    minHeight: 89,
    justifyContent: 'center',
  },
  iceMapBtnTitle: {
    fontSize: 21,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'PassionOne-Regular',
  },
  iceMapTipsBtn: {
    alignItems: 'center',
    width: 308,
    minHeight: 124,
    justifyContent: 'center',
  },
  iceMapButtonsWrapper: {
    marginTop: 20,
    gap: 18,
  },
});

export default IceMapFishingExpeditionHome;
