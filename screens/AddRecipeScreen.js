import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { insertRecipe } from '../database/db';

export default function AddRecipeScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSave = () => {
    if (!title || !desc || !instructions) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    insertRecipe(title, desc, instructions, (success) => {
      if (success) {
        navigation.goBack();
      } else {
        Alert.alert('Erro ao salvar receita');
      }
    });
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Título" style={styles.input} value={title} onChangeText={setTitle} />
      <TextInput placeholder="Descrição" style={styles.input} value={desc} onChangeText={setDesc} />
      <TextInput
        placeholder="Instruções"
        style={[styles.input, { height: 100 }]}
        multiline
        value={instructions}
        onChangeText={setInstructions}
      />
      <Button title="Salvar Receita" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderBottomWidth: 1,
    marginBottom: 15,
    padding: 8
  }
});