import {createStackNavigator} from '@react-navigation/stack';
import {observer} from 'mobx-react';
import HomeView from './layout/home/HomeView';
import RepoView from './layout/home/repo/RepoView';
import LoginStore from './layout/login/LoginStore';
import LoginView from './layout/login/LoginView';
import React from 'react';

const RootStack = createStackNavigator();
const AppStack = createStackNavigator();
const LoginStack = createStackNavigator();

const AppNavigator = (): any => {
    return (
        <AppStack.Navigator initialRouteName="HomeView" headerMode="none" screenOptions={{headerShown: false}}>
            <AppStack.Screen name="HomeView" component={HomeView} />
            <AppStack.Screen name="RepoView" component={RepoView} />
        </AppStack.Navigator>
    );
};

const LoginNavigator = (): any => {
    return (
        <LoginStack.Navigator initialRouteName="LoginView" headerMode="none" screenOptions={{headerShown: false}}>
            <LoginStack.Screen name="LoginView" component={LoginView} />
        </LoginStack.Navigator>
    );
};

/**
 * Root application navigator that navigates between login screen, driver app and laundry app
 */
const RootNavigator = observer(({loginStore}: {loginStore: LoginStore}): any => {
    return (
        <RootStack.Navigator
            headerMode="none"
            initialRouteName={loginStore.userRights === 'LoginNavigator' ? 'LoginNavigator' : 'AppNavigator'}>
            {loginStore.userRights !== 'LoginNavigator' ? (
                <RootStack.Screen name="AppNavigator" component={AppNavigator} />
            ) : (
                <RootStack.Screen name="LoginNavigator" component={LoginNavigator} />
            )}
        </RootStack.Navigator>
    );
});

export default RootNavigator;
