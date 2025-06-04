import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import AddRecipeScreen from './screens/AddRecipeScreen';
import SearchScreen from './screens/SearchScreen.js';
import { createTables } from './database/db';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    createTables();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Receitas ao Ar Livre" component={HomeScreen} />
        <Stack.Screen name="Detalhes" component={DetailScreen} />
        <Stack.Screen name="Adicionar Receita" component={AddRecipeScreen} />
        <Stack.Screen name="Buscar Receita" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
