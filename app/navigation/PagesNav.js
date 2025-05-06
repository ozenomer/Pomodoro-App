import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from '../context/ThemeContext'; 


import MainPage from '../(tabs)/MainPage';
import SettingsPage from '../(tabs)/_settingsPage';
import ShortTimer from '../(tabs)/shortTimer';
import ColorChange from '../settingsPages/_changeColor';
import BgChange from '../settingsPages/_changeBg';
import FontChange from '../settingsPages/_changeFont';
import NotFound from '../+not-found';

const Page = createStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Page.Navigator initialRouteName="MainPage">
          <Page.Screen
            name="MainPage"
            component={MainPage}
            options={{ headerShown: false }}
          />
          <Page.Screen name="SettingsPage" component={SettingsPage} />
          <Page.Screen name="NotFound" component={NotFound} />
          <Page.Screen name="ShortTimer" component={ShortTimer} />
          <Page.Screen name="ColorChange" component={ColorChange} />
          <Page.Screen name="BgChange" component={BgChange} />
          <Page.Screen name="FontChange" component={FontChange} />
        </Page.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
