import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {configure} from 'mobx';
import {NativeBaseProvider} from 'native-base';
import React, {createContext, useEffect} from 'react';
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
    const [newGqlClient, setNewGqlClient] = React.useState<any>(null);
    const [githubToken, setGithubToken] = React.useState<string>('');
    loginStore.setGithubToken = setGithubToken;

    useEffect(() => {
        const httpLink = createHttpLink({
            uri: 'https://api.github.com/graphql',
            headers: {
                authorization: `Bearer ${githubToken}`,
            },
        });
        const tempGqlClient = new ApolloClient({
            link: httpLink,
            cache: new InMemoryCache(),
        });
        setNewGqlClient(tempGqlClient);
    }, [githubToken]);

    if (!newGqlClient || githubToken === '') {
        return (
            <ApolloProvider client={gqlClient}>
                <NativeBaseProvider>
                    <NavigationContainer>
                        <RootNavigator loginStore={loginStore} />
                    </NavigationContainer>
                </NativeBaseProvider>
            </ApolloProvider>
        );
    }
    return (
        <ApolloProvider client={newGqlClient}>
            <NativeBaseProvider>
                <NavigationContainer>
                    <RootNavigator loginStore={loginStore} />
                </NavigationContainer>
            </NativeBaseProvider>
        </ApolloProvider>
    );
};

export default App;
