import IceMapFishingExpeditionStack from './IceMapFishingExpedition/IceMapFishingExpeditionNavigation/IceMapFishingExpeditionStack';
import IceMapFishingExpeditionLoader from './IceMapFishingExpedition/IceMapFishingExpeditionComponents/IceMapFishingExpeditionLoader';
import { ContextProvider } from './IceMapFishingExpedition/IceMapFishingExpeditionStore/iceMapFishingExpeditionContext';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3500);
  }, []);

  return (
    <NavigationContainer>
      <ContextProvider>
        {isLoading ? (
          <IceMapFishingExpeditionLoader />
        ) : (
          <IceMapFishingExpeditionStack />
        )}
      </ContextProvider>
    </NavigationContainer>
  );
};

export default App;
