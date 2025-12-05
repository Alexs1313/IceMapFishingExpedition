import { createStackNavigator } from '@react-navigation/stack';
import IceMapFishingExpeditionOnboard from '../IceMapFishingExpeditionScreens/IceMapFishingExpeditionOnboard';
import IceMapFishingExpeditionHome from '../IceMapFishingExpeditionScreens/IceMapFishingExpeditionHome';
import IceMapFishingExpeditionConduct from '../IceMapFishingExpeditionScreens/IceMapFishingExpeditionConduct';
import IceMapFishingExpeditionPlacesList from '../IceMapFishingExpeditionScreens/IceMapFishingExpeditionPlacesList';
import IceMapFishingExpeditionSaved from '../IceMapFishingExpeditionScreens/IceMapFishingExpeditionSaved';
import IceMapFishingExpeditionTips from '../IceMapFishingExpeditionScreens/IceMapFishingExpeditionTips';
import IceMapFishingExpeditionSettings from '../IceMapFishingExpeditionScreens/IceMapFishingExpeditionSettings';

const Stack = createStackNavigator();

const IceMapFishingExpeditionStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
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

export default IceMapFishingExpeditionStack;
