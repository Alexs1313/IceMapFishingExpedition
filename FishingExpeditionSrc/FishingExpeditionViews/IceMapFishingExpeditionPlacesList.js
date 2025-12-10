import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity as CustomTouchable,
  Dimensions,
  Share,
  Linking,
  Animated,
  Easing,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { iceMapFishingPlaces } from '../FishingExpeditionConsts/iceMapFishingExpeditionPlaces';
import FishingExpeditionCustomBackground from '../FishingExpeditionCustomComponents/FishingExpeditionCustomBackground';

const { height } = Dimensions.get('window');

export default function IceMapFishingExpeditionPlaces() {
  const navigation = useNavigation();

  const [iceMapShowIntro, setIceMapShowIntro] = useState(true);
  const [iceMapSelectedPlace, setIceMapSelectedPlace] = useState(null);
  const [iceMapLoading, setIceMapLoading] = useState(false);
  const [iceMapShowDetails, setIceMapShowDetails] = useState(false);
  const [iceMapFavorites, setIceMapFavorites] = useState([]);
  const iceMapHelicopterY = useState(new Animated.Value(0))[0];

  useEffect(() => {
    iceMapLoadFavorites();
  }, []);

  const iceMapLoadFavorites = async () => {
    const fishingData = await AsyncStorage.getItem('IceMapFavorites');
    if (fishingData) setIceMapFavorites(JSON.parse(fishingData));
  };

  const iceMapToggleFavorite = async id => {
    let updatedFavorites = [];

    if (iceMapFavorites.includes(id)) {
      updatedFavorites = iceMapFavorites.filter(f => f !== id);
    } else {
      updatedFavorites = [...iceMapFavorites, id];
    }

    setIceMapFavorites(updatedFavorites);
    await AsyncStorage.setItem(
      'IceMapFavorites',
      JSON.stringify(updatedFavorites),
    );
  };

  const iceMapIsFavorite = id => iceMapFavorites.includes(id);

  const iceMapOpenPlace = place => {
    setIceMapSelectedPlace(place);
    setIceMapLoading(true);

    iceMapHelicopterY.setValue(0);

    Animated.timing(iceMapHelicopterY, {
      toValue: -350,
      duration: 3000,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      setIceMapLoading(false);
      setIceMapShowDetails(true);
    }, 3000);
  };

  const iceMapGoBackToList = () => {
    setIceMapShowDetails(false);
    setIceMapSelectedPlace(null);
  };

  const iceMapSharePlace = async place => {
    try {
      await Share.share({
        message: `${place.title}\n${place.coords}\n\n${place.text}`,
      });
    } catch (e) {}
  };

  const iceMapOpenMap = coordsString => {
    try {
      const [latRaw, lonRaw] = coordsString.split(',');

      let fishingLat = latRaw.replace(/[^\d.-]/g, '').trim();
      if (latRaw.includes('S')) fishingLat = '-' + fishingLat;

      let fishingLon = lonRaw.replace(/[^\d.-]/g, '').trim();
      if (lonRaw.includes('W')) fishingLon = '-' + fishingLon;
      const fishingUrl = `https://www.google.com/maps/search/?api=1&query=${fishingLat},${fishingLon}`;
      Linking.openURL(fishingUrl);
    } catch (e) {
      console.log('ERROR:', e);
    }
  };

  return (
    <FishingExpeditionCustomBackground>
      <View style={styles.iceMapContainer}>
        {!iceMapLoading && (
          <View style={styles.iceMapHeaderRow}>
            <CustomTouchable
              onPress={() =>
                iceMapShowDetails ? iceMapGoBackToList() : navigation.goBack()
              }
              style={styles.iceMapBackBtn}
              activeOpacity={0.7}
            >
              <Image
                source={require('../../assets/images/icemapbackbtn.png')}
              />
            </CustomTouchable>
            <Text style={styles.iceMapHeaderTitle}>LIST OF PLACE</Text>
          </View>
        )}

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
                  alignItems: 'center',
                  paddingTop: 30,
                  paddingHorizontal: 20,
                  justifyContent: 'center',
                }}
              >
                <Text style={styles.iceMapIntroText}>
                  Choose the location that calls to you. Here are the best
                  winter spots in the world — with photos, coordinates, and
                  descriptions.
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

        {iceMapLoading && (
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'center',
              height: 700,
            }}
          >
            <Text style={styles.iceMapLoaderText}>
              THEY FLEW TO{'\n'}THE PLACE!
            </Text>

            <Animated.View
              style={{
                transform: [{ translateY: iceMapHelicopterY }],
                position: 'absolute',
                bottom: 20,
                width: '100%',
                alignItems: 'center',
              }}
            >
              <Image
                source={require('../../assets/images/icemapldr.png')}
                style={{
                  width: 340,
                  height: 280,
                  resizeMode: 'contain',
                }}
              />
            </Animated.View>
          </View>
        )}

        {!iceMapLoading && iceMapShowDetails && iceMapSelectedPlace && (
          <View style={{ alignItems: 'center' }}>
            <ImageBackground
              source={require('../../assets/images/icemapdetcard.png')}
              style={styles.iceMapDetailsCard}
            >
              <View style={{ paddingTop: 25 }}>
                <Image
                  source={iceMapSelectedPlace.image}
                  style={styles.iceMapDetailsImg}
                  resizeMode="cover"
                />
              </View>
            </ImageBackground>

            <View>
              <ImageBackground
                source={require('../../assets/images/icemapdetcard.png')}
                style={styles.iceMapDetailsCard}
              >
                <View
                  style={{
                    alignItems: 'center',
                    paddingTop: 18,
                    paddingHorizontal: 20,
                  }}
                >
                  <Text style={styles.iceMapDetailsTitle}>
                    {iceMapSelectedPlace.title}
                  </Text>
                  <Text style={styles.iceMapDetailsCoords}>
                    {iceMapSelectedPlace.coords}
                  </Text>

                  <Text style={styles.iceMapDetailsText}>
                    {iceMapSelectedPlace.text}
                  </Text>
                </View>
              </ImageBackground>
              <View style={styles.iceMapIconRow}>
                <CustomTouchable
                  onPress={() => iceMapSharePlace(iceMapSelectedPlace)}
                  activeOpacity={0.7}
                >
                  <Image
                    source={require('../../assets/images/icemapshr.png')}
                  />
                </CustomTouchable>

                <CustomTouchable
                  onPress={() => iceMapOpenMap(iceMapSelectedPlace.coords)}
                  activeOpacity={0.7}
                >
                  <Image
                    source={require('../../assets/images/icemapmap.png')}
                  />
                </CustomTouchable>

                <CustomTouchable
                  onPress={() => iceMapToggleFavorite(iceMapSelectedPlace.id)}
                  activeOpacity={0.7}
                >
                  <Image
                    source={
                      iceMapIsFavorite(iceMapSelectedPlace.id)
                        ? require('../../assets/images/icemapsvd.png')
                        : require('../../assets/images/icemapsv.png')
                    }
                  />
                </CustomTouchable>
              </View>
            </View>
          </View>
        )}

        {!iceMapLoading && !iceMapShowDetails && !iceMapShowIntro && (
          <View style={{ alignItems: 'center' }}>
            {iceMapFishingPlaces.map(p => (
              <ImageBackground
                key={p.id}
                source={require('../../assets/images/icemapdetcard.png')}
                style={styles.iceMapPlaceCard}
              >
                <View style={{ alignItems: 'center', paddingTop: 22 }}>
                  <Image source={p.image} style={styles.iceMapPlaceImg} />

                  <Text style={styles.iceMapPlaceTitle}>{p.title}</Text>
                  <Text style={styles.iceMapPlaceCoords}>{p.coords}</Text>

                  <CustomTouchable
                    onPress={() => iceMapOpenPlace(p)}
                    activeOpacity={0.9}
                  >
                    <ImageBackground
                      source={require('../../assets/images/icemapconfbtn.png')}
                      style={styles.iceMapOpenBtn}
                    >
                      <Text style={styles.iceMapOpenBtnText}>OPEN</Text>
                    </ImageBackground>
                  </CustomTouchable>
                </View>
              </ImageBackground>
            ))}

            <View style={{ height: 80 }} />
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
    paddingBottom: 50,
  },
  iceMapHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '88%',
    marginBottom: 30,
  },
  iceMapHeaderTitle: {
    fontSize: 32,
    fontFamily: 'PassionOne-Regular',
    color: '#fff',
    marginLeft: 10,
  },
  iceMapIntroCard: {
    width: 356,
    minHeight: 319,
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iceMapIntroText: {
    fontSize: 18,
    fontFamily: 'PassionOne-Regular',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
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
  iceMapPlaceCard: {
    width: 369,
    minHeight: 311,
    padding: 20,
    marginBottom: 20,
    position: 'relative',
  },
  iceMapPlaceImg: {
    width: '90%',
    height: 105,
    alignSelf: 'center',
    marginBottom: 12,
    borderRadius: 22,
  },
  iceMapPlaceTitle: {
    fontSize: 20,
    fontFamily: 'PassionOne-Regular',
    textAlign: 'center',
  },
  iceMapPlaceCoords: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 12,
    color: '#083571',
    fontFamily: 'PassionOne-Regular',
  },
  iceMapOpenBtn: {
    width: 180,
    height: 77,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    top: 30,
  },
  iceMapOpenBtnText: {
    fontSize: 28,
    color: '#fff',
    fontFamily: 'PassionOne-Regular',
  },
  iceMapLoaderText: {
    fontSize: 32,
    color: '#fff',
    fontFamily: 'PassionOne-Regular',
    textAlign: 'center',
    marginTop: 40,
  },
  iceMapDetailsCard: {
    width: 356,
    height: 306,
    padding: 20,
    paddingTop: 15,
  },
  iceMapDetailsImg: {
    width: '90%',
    height: 210,
    borderRadius: 22,
    alignSelf: 'center',
  },
  iceMapDetailsTitle: {
    fontSize: 18,
    fontFamily: 'PassionOne-Regular',
    textAlign: 'center',
  },
  iceMapDetailsCoords: {
    fontSize: 12,
    fontFamily: 'PassionOne-Regular',
    textAlign: 'center',
    marginBottom: 8,
    color: '#083571',
    marginTop: 3,
  },
  iceMapDetailsText: {
    fontSize: 12,
    fontFamily: 'PassionOne-Regular',
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },
  iceMapIconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 14,
    position: 'absolute ',
    bottom: 65,
  },
  iceMapBackBtn: {
    marginRight: 10,
  },
});
