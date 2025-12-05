import { ImageBackground, ScrollView } from 'react-native';

const IceMapFishingExpeditionLayout = ({ children }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/icemapback.png')}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </ImageBackground>
  );
};

export default IceMapFishingExpeditionLayout;
