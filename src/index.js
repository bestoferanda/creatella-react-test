import React from 'react'
import { Provider } from 'mobx-react'
import RootModel from './models'
import RootNavigator from './navigation'
import "react-native-gesture-handler";
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

export const store = RootModel.create({});

const App = () => (
  <React.Fragment>
    <ApplicationProvider {...eva} theme={eva.light}>
      <Provider store={store}>
        <RootNavigator ref={ref => {
          navigationRef = ref;
        }} />
      </Provider>
    </ApplicationProvider>
  </React.Fragment>
);

export default App;