import {NavigationContainer} from '@react-navigation/native';
import {configure} from 'mobx';
import {NativeBaseProvider} from 'native-base';
import React, {createContext} from 'react';
import RootNavigator from './AppNavigator';
import RootStore from './RootStore';

/**
 * Enforces MobX action use
 */
configure({enforceActions: 'always'});

/**
 * Main app context for hooks
 */
const rootStore = new RootStore();
const {loginStore} = rootStore;
export const RootContext = createContext(rootStore);

const App = () => {
    return (
        <NativeBaseProvider>
            <NavigationContainer>
                <RootNavigator loginStore={loginStore} />
            </NavigationContainer>
        </NativeBaseProvider>
    );
};

export default App;
