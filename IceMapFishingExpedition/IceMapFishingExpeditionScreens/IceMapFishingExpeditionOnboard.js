import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IceMapFishingExpeditionLayout from '../IceMapFishingExpeditionComponents/IceMapFishingExpeditionLayout';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const IceMapFishingExpeditionOnboard = () => {
  const [iceMapOnboardSlide, setIceMapOnboardSlide] = useState(0);
  const navigation = useNavigation();

  const handleNextIceMapSlide = () => {
    if (iceMapOnboardSlide < 2) {
      setIceMapOnboardSlide(iceMapOnboardSlide + 1);
    } else {
      navigation.replace('IceMapFishingExpeditionHome');
    }
  };

  return (
    <IceMapFishingExpeditionLayout>
      <View style={styles.iceMapContainer}>
        {iceMapOnboardSlide === 0 && (
          <Image source={require('../../assets/images/icemapon1.png')} />
        )}
        {iceMapOnboardSlide === 1 && (
          <Image
            source={require('../../assets/images/icemapon2.png')}
            style={{ marginBottom: 50 }}
          />
        )}
        {iceMapOnboardSlide === 2 && (
          <Image
            source={require('../../assets/images/icemapon3.png')}
            style={{ marginBottom: 60 }}
          />
        )}
        {iceMapOnboardSlide === 3 && (
          <Image
            source={require('../../assets/images/icemapon4.png')}
            style={{ marginBottom: 30 }}
          />
        )}

        <ImageBackground
          source={require('../../assets/images/icemapwlccnt.png')}
          style={{
            alignItems: 'center',
            width: 366,
            minHeight: 306,
          }}
        >
          <View style={styles.iceMapWelcomeCnt}>
            <Text style={styles.iceMapWelcomeTitle}>
              {iceMapOnboardSlide === 0 &&
                `Hello! I'm Aria Frostwell, your guide to the world of winter
fishing. Together we will explore the most picturesque places in
the world, where the ice is silent and nature speaks.`}
              {iceMapOnboardSlide === 1 &&
                `I've collected 13 safe and incredibly beautiful locations: photos, coordinates, descriptions and everything you need for a trip to the ice.`}
              {iceMapOnboardSlide === 2 &&
                `Become the owner of the tip:
• Red fish — one tip
• Gold fish — three
I'll tell you what you should know before going out 
on the ice."
`}
              {iceMapOnboardSlide === 3 &&
                `Check out every spot on the map and follow safety rules. Ice is beautiful, but respect for it always comes first.`}
            </Text>
          </View>
        </ImageBackground>

        <TouchableOpacity activeOpacity={0.8} onPress={handleNextIceMapSlide}>
          <ImageBackground
            source={require('../../assets/images/icemapbtn.png')}
            style={{
              alignItems: 'center',
              width: 183,
              minHeight: 116,
              justifyContent: 'center',
              top: -55,
            }}
          >
            <Text style={styles.iceMapBtnTitle}>
              {iceMapOnboardSlide === 0 && 'HELLO'}
              {iceMapOnboardSlide === 1 && 'GOOD'}
              {iceMapOnboardSlide === 2 && 'OKAY'}
              {iceMapOnboardSlide === 3 && 'START'}
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </IceMapFishingExpeditionLayout>
  );
};

const styles = StyleSheet.create({
  iceMapContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  },
  iceMapWelcomeCnt: {
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 30,
    justifyContent: 'center',
    flex: 1,
  },
  iceMapWelcomeTitle: {
    fontSize: 19,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'PassionOne-Regular',
  },
  iceMapBtnTitle: {
    fontSize: 36,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'PassionOne-Regular',
  },
});

export default IceMapFishingExpeditionOnboard;
