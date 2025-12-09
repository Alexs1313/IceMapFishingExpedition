import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import IceMapFishingExpeditionLayout from '../IceMapFishingExpeditionComponents/IceMapFishingExpeditionLayout';
import { useNavigation } from '@react-navigation/native';
import { iceMapRules } from '../IceMapFishingExpeditionConsts/iceMapRules';

const { height } = Dimensions.get('window');

const IceMapFishingExpeditionConduct = () => {
  const navigation = useNavigation();
  const [iceMapShowRules, setIceMapShowRules] = useState(false);

  return (
    <IceMapFishingExpeditionLayout>
      <View style={styles.iceMapContainer}>
        <View style={styles.iceMapHeaderRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iceMapBackBtn}
            activeOpacity={0.7}
          >
            <Image source={require('../../assets/images/icemapbackbtn.png')} />
          </TouchableOpacity>

          <Text style={styles.iceMapHeaderTitle}>RULES OF CONDUCT</Text>
        </View>

        {!iceMapShowRules && (
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../../assets/images/icemaprules.png')}
              style={{ top: 20 }}
            />

            <ImageBackground
              source={require('../../assets/images/icemaprulescard.png')}
              style={styles.iceMapIntroCard}
            >
              <Text style={styles.iceMapIntroText}>
                Before you hit the ice, review these rules. They're simple, but
                they’re what make every winter trip safe.
              </Text>

              <TouchableOpacity
                onPress={() => setIceMapShowRules(true)}
                activeOpacity={0.9}
              >
                <ImageBackground
                  source={require('../../assets/images/icemapconfbtn.png')}
                  style={styles.iceMapGoodBtn}
                >
                  <Text style={styles.iceMapGoodBtnText}>GOOD</Text>
                </ImageBackground>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        )}

        {iceMapShowRules && (
          <View style={{ width: '100%', marginTop: 10, alignItems: 'center' }}>
            {iceMapRules.map((item, index) => (
              <ImageBackground
                key={index}
                source={require('../../assets/images/icemaprulescard.png')}
                style={styles.iceMapRuleCard}
              >
                <Text style={styles.iceMapRuleTitle}>{item.title}</Text>
                <Text style={styles.iceMapRuleDesc}>{item.text}</Text>
              </ImageBackground>
            ))}

            <View style={{ height: 30 }} />
          </View>
        )}
      </View>
    </IceMapFishingExpeditionLayout>
  );
};

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
    marginBottom: 20,
  },
  iceMapBackBtn: {
    marginRight: 10,
  },
  iceMapHeaderTitle: {
    fontSize: 32,
    color: '#fff',
    fontFamily: 'PassionOne-Regular',
    width: '80%',
  },
  iceMapIntroCard: {
    width: 356,
    minHeight: 306,
    padding: 20,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iceMapIntroText: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'PassionOne-Regular',
    textAlign: 'center',
  },
  iceMapGoodBtn: {
    width: 205,
    minHeight: 89,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
  },
  iceMapGoodBtnText: {
    color: '#fff',
    fontSize: 25,
    fontFamily: 'PassionOne-Regular',
  },
  iceMapRuleCard: {
    width: 356,
    minHeight: 306,
    padding: 20,
    marginBottom: 20,
    paddingHorizontal: 35,
    paddingTop: 50,
  },
  iceMapRuleTitle: {
    fontSize: 22,
    fontFamily: 'PassionOne-Regular',
    color: '#000',
    marginBottom: 12,
  },
  iceMapRuleDesc: {
    fontSize: 18,
    fontFamily: 'PassionOne-Regular',
    color: '#000',
  },
});

export default IceMapFishingExpeditionConduct;
