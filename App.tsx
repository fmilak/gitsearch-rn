import {ApolloProvider} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {configure} from 'mobx';
import {NativeBaseProvider} from 'native-base';
import React, {createContext} from 'react';
import RootNavigator from './AppNavigator';
import RootStore from './RootStore';
import {gqlClient} from './service/GqlService';

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
        <ApolloProvider client={gqlClient}>
            <NativeBaseProvider>
                <NavigationContainer>
                    <RootNavigator loginStore={loginStore} />
                </NavigationContainer>
            </NativeBaseProvider>
        </ApolloProvider>
    );
};

export default App;
