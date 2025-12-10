import FishingExpeditionNav from './FishingExpeditionSrc/FishingExpeditionRoutes/FishingExpeditionNav';
import { ContextProvider as FishingExpeditionContext } from './FishingExpeditionSrc/FishingExpeditionStore/iceMapFishingExpeditionContext';
import { NavigationContainer as FishingExpeditionNavigation } from '@react-navigation/native';

const App = () => {
  return (
    <FishingExpeditionNavigation>
      <FishingExpeditionContext>
        <FishingExpeditionNav />
      </FishingExpeditionContext>
    </FishingExpeditionNavigation>
  );
};

export default App;
