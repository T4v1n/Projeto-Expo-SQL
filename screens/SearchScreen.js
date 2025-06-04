import React, { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet, Button } from 'react-native';
import { searchRecipes } from '../database/db';
import RecipeCard from '../components/RecipeCard';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    searchRecipes(query, setResults);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar por título"
        style={styles.input}
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Buscar" onPress={handleSearch} />
      <FlatList
        data={results}
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
  container: { flex: 1, padding: 20 },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 8
  }
});