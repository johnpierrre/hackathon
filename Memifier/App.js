import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, View, StyleSheet } from 'react-native';
import HomePage from './pages/HomePage/HomePage';
import ImageEditingPage from './pages/ImageEditingPage/ImageEditingPage';
import VideoEditingPage from './pages/VideoEditingPage/VideoEditingPage';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="ImageEditing" component={ImageEditingPage} />
        <Stack.Screen name="VideoEditing" component={VideoEditingPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
