import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Button } from 'react-native';
import RecipeCard from '../components/RecipeCard';
import { getAllRecipes } from '../database/db';

export default function HomeScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);

  const loadRecipes = () => {
    getAllRecipes(setRecipes);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadRecipes);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Button title="Adicionar Receita" onPress={() => navigation.navigate('Adicionar Receita')} />
      <Button title="Buscar Receita" onPress={() => navigation.navigate('Buscar Receita')} />
      <FlatList
        data={recipes}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={() => navigation.navigate('Detalhes', { recipe: item })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  }
});