import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView 
} from 'react-native';

export const DetailScreen = ({ route, navigation }) => {
  const { recipe } = route.params;
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes da Receita</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.recipeTitle}>{recipe.titulo}</Text>
          
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionHeader}>📝 Descrição</Text>
            <Text style={styles.descriptionText}>{recipe.descricao}</Text>
          </View>
          
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionsHeader}>🔥 Instruções de Preparo</Text>
            <View style={styles.instructionsBox}>
              <Text style={styles.instructionsText}>{recipe.instrucoes}</Text>
            </View>
          </View>

          <View style={styles.enjoyContainer}>
            <Text style={styles.enjoyText}>🍽️ Aproveite sua refeição!</Text>
          </View>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>🏕️ Receitas para momentos especiais</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FED7AA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    marginRight: 12,
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#F97316',
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 24,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  descriptionHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 22,
  },
  instructionsContainer: {
    marginBottom: 24,
  },
  instructionsHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  instructionsBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
  },
  instructionsText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  enjoyContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    borderRadius: 8,
    padding: 16,
  },
  enjoyText: {
    color: '#EA580C',
    fontWeight: '600',
    fontSize: 16,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
  },
});
