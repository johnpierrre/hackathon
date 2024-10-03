import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, View, StyleSheet } from 'react-native';
import HomePage from './pages/HomePage/HomePage';
import ImageEditingPage from './pages/ImageEditingPage/ImageEditingPage';
import StaticMemeCreationPage from './pages/StaticMemeCreationPage/StaticMemeCreationPage';
import VideoEditingPage from './pages/VideoEditingPage/VideoEditingPage';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Memifier">
        <Stack.Screen
          name="Memifier"
          component={HomePage}
          options={{
            title: 'Memefier',
            headerStyle: { backgroundColor: '#222' },
            headerTintColor: '#ddd',
          }}
        />
        <Stack.Screen
          name="Meme Templates"
          component={ImageEditingPage}
          options={{
            title: 'Meme Templates',
            headerStyle: { backgroundColor: '#222' },
            headerTintColor: '#ddd',
          }}
        />
        <Stack.Screen
          name="Meme Clips"
          component={VideoEditingPage}
          options={{
            title: 'Meme Clips',
            headerStyle: { backgroundColor: '#222' },
            headerTintColor: '#ddd',
          }}
        />
        <Stack.Screen
          name="Meme Editor"
          component={StaticMemeCreationPage}
          options={{
            title: 'Meme Editor',
            headerStyle: { backgroundColor: '#222' },
            headerTintColor: '#ddd',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
