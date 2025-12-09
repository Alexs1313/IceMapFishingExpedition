import React, { useState, useRef } from 'react';
import IceMapFishingExpeditionLayout from '../IceMapFishingExpeditionComponents/IceMapFishingExpeditionLayout';
import { useNavigation } from '@react-navigation/native';
import { iceMapFishingTips } from '../IceMapFishingExpeditionConsts/iceMapFishingTips';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
  Share,
} from 'react-native';

const { height } = Dimensions.get('window');

export default function IceMapFishingExpeditionTips() {
  const navigation = useNavigation();

  const [iceMapShowIntro, setIceMapShowIntro] = useState(true);
  const [iceMapLoading, setIceMapLoading] = useState(false);
  const [iceMapQuote, setIceMapQuote] = useState(null);
  const [iceMapFishColor, setIceMapFishColor] = useState(null);

  const iceMapPulseAnim = useRef(new Animated.Value(1)).current;

  const iceMapStartLoader = () => {
    setIceMapShowIntro(false);
    setIceMapLoading(true);
    setIceMapQuote(null);

    const color = Math.random() < 0.5 ? 'red' : 'gold';
    setIceMapFishColor(color);

    iceMapPulseAnim.setValue(1);

    Animated.loop(
      Animated.sequence([
        Animated.timing(iceMapPulseAnim, {
          toValue: 1.12,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(iceMapPulseAnim, {
          toValue: 1,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
      { iterations: 3 },
    ).start();

    setTimeout(() => {
      if (color === 'red') {
        const randomTip =
          iceMapFishingTips[
            Math.floor(Math.random() * iceMapFishingTips.length)
          ];
        setIceMapQuote([randomTip]);
      } else {
        const shuffled = [...iceMapFishingTips].sort(() => Math.random() - 0.5);
        setIceMapQuote(shuffled.slice(0, 3));
      }

      setIceMapLoading(false);
    }, 3000);
  };

  const iceMapShareQuote = async () => {
    if (!iceMapQuote) return;

    await Share.share({
      message: iceMapQuote.join('\n\n'),
    });
  };

  return (
    <IceMapFishingExpeditionLayout>
      <View style={styles.iceMapContainer}>
        <View style={styles.iceMapHeaderRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Image source={require('../../assets/images/icemapbackbtn.png')} />
          </TouchableOpacity>

          <Text style={styles.iceMapHeaderTitle}>FISHING TIPS</Text>
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
              <View style={styles.iceMapIntroInner}>
                <Text style={styles.iceMapIntroText}>
                  Ready for some advice? Click — let the fish tell you what to
                  do on the ice today. Red will show one tip, gold — three.
                </Text>

                <TouchableOpacity
                  onPress={iceMapStartLoader}
                  activeOpacity={0.9}
                >
                  <ImageBackground
                    source={require('../../assets/images/icemapconfbtn.png')}
                    style={styles.iceMapStartBtn}
                  >
                    <Text style={styles.iceMapStartText}>START</Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        )}

        {iceMapLoading && (
          <View style={styles.iceMapLoaderContainer}>
            <Animated.Image
              source={require('../../assets/images/icemapdetwheel.png')}
              style={{
                transform: [{ scale: iceMapPulseAnim }],
              }}
            />
          </View>
        )}

        {!iceMapLoading && !iceMapShowIntro && iceMapQuote && (
          <View style={{ alignItems: 'center' }}>
            <ImageBackground
              source={require('../../assets/images/icemaprulescard.png')}
              style={styles.iceMapQuoteCard}
            >
              <View style={styles.iceMapQuoteInner}>
                <Image
                  source={
                    iceMapFishColor === 'red'
                      ? require('../../assets/images/icemapdetred.png')
                      : require('../../assets/images/icemapdetgold.png')
                  }
                  style={{ marginBottom: 20 }}
                />

                {iceMapQuote.map((q, index) => (
                  <Text key={index} style={styles.iceMapQuoteText}>
                    {iceMapFishColor === 'gold' ? `${index + 1}. ${q}` : q}
                  </Text>
                ))}
              </View>
            </ImageBackground>

            <TouchableOpacity onPress={iceMapShareQuote} activeOpacity={0.8}>
              <ImageBackground
                source={require('../../assets/images/icemapconfbtn.png')}
                style={styles.iceMapActionBtn}
              >
                <Text style={styles.iceMapActionBtnText}>SHARE</Text>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity onPress={iceMapStartLoader} activeOpacity={0.8}>
              <ImageBackground
                source={require('../../assets/images/icemapconfbtn.png')}
                style={styles.iceMapActionBtn}
              >
                <Text style={styles.iceMapActionBtnText}>RESTART</Text>
              </ImageBackground>
            </TouchableOpacity>
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
    width: '88%',
    alignItems: 'center',
    marginBottom: 20,
  },
  iceMapHeaderTitle: {
    fontSize: 32,
    color: '#fff',
    marginLeft: 10,
    fontFamily: 'PassionOne-Regular',
  },
  iceMapIntroCard: {
    width: 356,
    minHeight: 319,
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iceMapIntroInner: {
    paddingTop: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iceMapIntroText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'PassionOne-Regular',
  },
  iceMapStartBtn: {
    width: 205,
    height: 89,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iceMapStartText: {
    fontSize: 30,
    color: '#fff',
    fontFamily: 'PassionOne-Regular',
  },
  iceMapLoaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 50,
    height: 500,
  },
  iceMapQuoteCard: {
    width: 356,
    minHeight: 306,
    padding: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  iceMapQuoteInner: {
    paddingTop: 10,
    alignItems: 'center',
  },
  iceMapQuoteText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
    fontFamily: 'PassionOne-Regular',
    marginBottom: 3,
  },
  iceMapActionBtn: {
    width: 205,
    height: 89,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  iceMapActionBtnText: {
    fontSize: 25,
    color: '#fff',
    fontFamily: 'PassionOne-Regular',
  },
});
