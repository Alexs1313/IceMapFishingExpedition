import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Share,
  Linking,
  Animated,
  Easing,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import IceMapFishingExpeditionLayout from '../IceMapFishingExpeditionComponents/IceMapFishingExpeditionLayout';
import { useNavigation } from '@react-navigation/native';
import { iceMapFishingPlaces } from '../IceMapFishingExpeditionConsts/iceMapFishingExpeditionPlaces';

const { height } = Dimensions.get('window');

export default function IceMapFishingExpeditionSaved() {
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
    const json = await AsyncStorage.getItem('IceMapFavorites');
    if (json) setIceMapFavorites(JSON.parse(json));
  };

  const iceMapIsFavorite = id => iceMapFavorites.includes(id);

  const iceMapToggleFavorite = async id => {
    const updated = iceMapFavorites.filter(f => f !== id);
    setIceMapFavorites(updated);
    await AsyncStorage.setItem('IceMapFavorites', JSON.stringify(updated));
  };

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

  const iceMapOpenMap = coords => {
    try {
      const [latRaw, lonRaw] = coords.split(',');

      let lat = latRaw.replace(/[^\d.-]/g, '').trim();
      let lon = lonRaw.replace(/[^\d.-]/g, '').trim();

      if (latRaw.includes('S')) lat = '-' + lat;
      if (lonRaw.includes('W')) lon = '-' + lon;

      Linking.openURL(
        `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`,
      );
    } catch (e) {
      console.log('MAP ERROR:', e);
    }
  };

  const iceMapSavedPlaces = iceMapFishingPlaces.filter(p =>
    iceMapFavorites.includes(p.id),
  );

  return (
    <IceMapFishingExpeditionLayout>
      <View style={styles.iceMapContainer}>
        {!iceMapLoading && (
          <View style={styles.iceMapHeaderRow}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                iceMapShowDetails ? iceMapGoBackToList() : navigation.goBack()
              }
            >
              <Image
                source={require('../../assets/images/icemapbackbtn.png')}
              />
            </TouchableOpacity>
            <Text style={styles.iceMapHeaderTitle}>SAVED PLACES</Text>
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
              <View style={{ paddingTop: 30, alignItems: 'center' }}>
                <Text style={styles.iceMapIntroText}>
                  Here are your favorite locations. When you return to them,
                  you'll always know where the ice was calmest and the fishing
                  was best.
                </Text>

                <TouchableOpacity
                  onPress={() => setIceMapShowIntro(false)}
                  activeOpacity={0.9}
                >
                  <ImageBackground
                    source={require('../../assets/images/icemapconfbtn.png')}
                    style={styles.iceMapOkayBtn}
                  >
                    <Text style={styles.iceMapOkayText}>CLOSE</Text>
                  </ImageBackground>
                </TouchableOpacity>
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
            }}
          >
            <Text style={styles.iceMapLoaderText}>
              THEY FLEW TO{'\n'}THE PLACE!
            </Text>

            <Animated.View
              style={{
                transform: [{ translateY: iceMapHelicopterY }],
                position: 'absolute',
                bottom: 50,
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
                    paddingHorizontal: 30,
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
                <TouchableOpacity
                  onPress={() => iceMapSharePlace(iceMapSelectedPlace)}
                  activeOpacity={0.7}
                >
                  <Image
                    source={require('../../assets/images/icemapshr.png')}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => iceMapOpenMap(iceMapSelectedPlace.coords)}
                  activeOpacity={0.7}
                >
                  <Image
                    source={require('../../assets/images/icemapmap.png')}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => iceMapToggleFavorite(iceMapSelectedPlace.id)}
                  activeOpacity={0.7}
                >
                  <Image
                    source={require('../../assets/images/icemapsvd.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {!iceMapLoading && !iceMapShowDetails && !iceMapShowIntro && (
          <View style={{ alignItems: 'center' }}>
            {iceMapSavedPlaces.length === 0 && (
              <Text style={styles.iceMapEmptyText}>No saved places yet.</Text>
            )}

            {iceMapSavedPlaces.map(p => (
              <ImageBackground
                key={p.id}
                source={require('../../assets/images/icemapdetcard.png')}
                style={styles.iceMapPlaceCard}
              >
                <View style={{ alignItems: 'center', paddingTop: 22 }}>
                  <Image source={p.image} style={styles.iceMapPlaceImg} />

                  <Text style={styles.iceMapPlaceTitle}>{p.title}</Text>
                  <Text style={styles.iceMapPlaceCoords}>{p.coords}</Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 20,
                      marginTop: 10,
                      top: 40,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => iceMapOpenPlace(p)}
                      activeOpacity={0.7}
                    >
                      <ImageBackground
                        source={require('../../assets/images/icemapconfbtn.png')}
                        style={styles.iceMapOpenBtn}
                      >
                        <Text style={styles.iceMapOpenBtnText}>OPEN</Text>
                      </ImageBackground>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => iceMapToggleFavorite(p.id)}
                      style={styles.iceMapRemoveIcon}
                      activeOpacity={0.7}
                    >
                      <Image
                        source={require('../../assets/images/icemapsvd.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </ImageBackground>
            ))}

            <View style={{ height: 80 }} />
          </View>
        )}
      </View>
    </IceMapFishingExpeditionLayout>
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
    justifyContent: 'center',
  },
  iceMapIntroText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'PassionOne-Regular',
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
  },
  iceMapPlaceImg: {
    width: '90%',
    height: 105,
    borderRadius: 22,
    marginBottom: 12,
    alignSelf: 'center',
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
  iceMapRemoveIcon: {
    alignSelf: 'center',
  },
  iceMapOpenBtn: {
    width: 181,
    height: 78,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iceMapOpenBtnText: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'PassionOne-Regular',
  },
  iceMapLoaderText: {
    fontSize: 32,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'PassionOne-Regular',
    marginTop: 40,
  },
  iceMapDetailsCard: {
    width: 356,
    height: 306,
    padding: 20,
    marginBottom: 20,
  },
  iceMapDetailsImg: {
    width: '90%',
    height: 210,
    borderRadius: 22,
    alignSelf: 'center',
  },
  iceMapDetailsTitle: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'PassionOne-Regular',
  },
  iceMapDetailsCoords: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
    color: '#083571',
    fontFamily: 'PassionOne-Regular',
  },
  iceMapDetailsText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#000',
    marginBottom: 20,
    fontFamily: 'PassionOne-Regular',
  },
  iceMapIconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 14,
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  iceMapEmptyText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 40,
    fontFamily: 'PassionOne-Regular',
  },
});
