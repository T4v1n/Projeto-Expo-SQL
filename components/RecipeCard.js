import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const RecipeCard = ({ title, description, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
  backgroundColor: '#FF6347',
  padding: 15,
  marginVertical: 8,
  borderRadius: 10,
  width: 280,       
  height: 100,      
  justifyContent: 'center',
  },
  title: {
    fontFamily: 'Brush Script MT, Brush Script Std, cursive',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#2e2e2e',
  },
  description: {
    color: '#F5DEB3',
    marginTop: 5,
  },
});

export default RecipeCard;