import { createStackNavigator } from '@react-navigation/stack';
import IceMapFishingExpeditionOnboard from '../FishingExpeditionViews/IceMapFishingExpeditionOnboard';
import IceMapFishingExpeditionHome from '../FishingExpeditionViews/IceMapFishingExpeditionHome';
import IceMapFishingExpeditionConduct from '../FishingExpeditionViews/IceMapFishingExpeditionConduct';
import IceMapFishingExpeditionPlacesList from '../FishingExpeditionViews/IceMapFishingExpeditionPlacesList';
import IceMapFishingExpeditionSaved from '../FishingExpeditionViews/IceMapFishingExpeditionSaved';
import IceMapFishingExpeditionTips from '../FishingExpeditionViews/IceMapFishingExpeditionTips';
import IceMapFishingExpeditionSettings from '../FishingExpeditionViews/IceMapFishingExpeditionSettings';
import FishingExpeditionCustomLoader from '../FishingExpeditionCustomComponents/FishingExpeditionCustomLoader';

const Stack = createStackNavigator();

const FishingExpeditionNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="FishingExpeditionCustomLoader"
        component={FishingExpeditionCustomLoader}
      />
      <Stack.Screen
        name="IceMapFishingExpeditionOnboard"
        component={IceMapFishingExpeditionOnboard}
      />
      <Stack.Screen
        name="IceMapFishingExpeditionHome"
        component={IceMapFishingExpeditionHome}
      />
      <Stack.Screen
        name="IceMapFishingExpeditionConduct"
        component={IceMapFishingExpeditionConduct}
      />
      <Stack.Screen
        name="IceMapFishingExpeditionPlacesList"
        component={IceMapFishingExpeditionPlacesList}
      />
      <Stack.Screen
        name="IceMapFishingExpeditionSaved"
        component={IceMapFishingExpeditionSaved}
      />
      <Stack.Screen
        name="IceMapFishingExpeditionTips"
        component={IceMapFishingExpeditionTips}
      />
      <Stack.Screen
        name="IceMapFishingExpeditionSettings"
        component={IceMapFishingExpeditionSettings}
      />
    </Stack.Navigator>
  );
};

export default FishingExpeditionNav;
