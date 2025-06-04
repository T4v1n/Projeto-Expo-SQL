import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import { RecipeCard } from '../components/RecipeCard';
import { 
  criarTabela, 
  listarReceitas, 
  buscarReceitas, 
  deletarReceita,
  inserirReceitasPadrao
} from '../../database/bancoDados';

export const HomeScreen = ({ navigation }) => {
  const [receitas, setReceitas] = useState([]);
  const [termoBusca, setTermoBusca] = useState('');
  const [modoGerenciamento, setModoGerenciamento] = useState(false);

  useEffect(() => {
    async function inicializar() {
      await criarTabela();
      await inserirReceitasPadrao();
      await carregarReceitas();
    }
    inicializar();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      carregarReceitas();
    });
    return unsubscribe;
  }, [navigation]);

  async function carregarReceitas() {
    try {
      const dados = await listarReceitas();
      setReceitas(dados);
    } catch (error) {
      console.error('Erro ao carregar receitas:', error);
    }
  }

  async function buscar() {
    try {
      if (termoBusca.trim()) {
        const dados = await buscarReceitas(termoBusca.trim());
        setReceitas(dados);
      } else {
        await carregarReceitas();
      }
    } catch (error) {
      console.error('Erro ao buscar receitas:', error);
    }
  }

  async function excluirReceita(id) {
    try {
      await deletarReceita(id);
      await carregarReceitas();
      Alert.alert("Sucesso", "Receita excluída com sucesso!");
    } catch (error) {
      console.error('Erro ao excluir receita:', error);
      Alert.alert("Erro", "Não foi possível excluir a receita.");
    }
  }

  function editarReceita(receita) {
    navigation.navigate('AddEdit', { receita, modoEdicao: true });
  }

  const renderReceita = ({ item }) => (
    <RecipeCard
      recipe={item}
      onPress={(selectedRecipe) => 
        navigation.navigate('Detail', { recipe: selectedRecipe })
      }
      onEdit={editarReceita}
      onDelete={excluirReceita}
      showActions={modoGerenciamento}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🔥 Receitas</Text>
        <Text style={styles.headerSubtitle}>Deliciosas receitas para você</Text>
      </View>

      {/* Barra de Busca */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar receitas..."
          value={termoBusca}
          onChangeText={setTermoBusca}
          onSubmitEditing={buscar}
        />
        <TouchableOpacity style={styles.searchButton} onPress={buscar}>
          <Text style={styles.searchButtonText}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Botões de Ação */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('AddEdit', { modoEdicao: false })}
        >
          <Text style={styles.addButtonText}>➕ Adicionar Receita</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.manageButton, modoGerenciamento && styles.manageButtonActive]}
          onPress={() => setModoGerenciamento(!modoGerenciamento)}
        >
          <Text style={[styles.manageButtonText, modoGerenciamento && styles.manageButtonTextActive]}>
            {modoGerenciamento ? '✅ Gerenciar' : '⚙️ Gerenciar'}
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={receitas}
        renderItem={renderReceita}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {termoBusca ? 'Nenhuma receita encontrada' : 'Nenhuma receita cadastrada'}
            </Text>
          </View>
        }
      />
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>🏕️ Bon appétit!!</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FED7AA',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchButton: {
    backgroundColor: '#F97316',
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 8,
    marginLeft: 8,
  },
  searchButtonText: {
    fontSize: 18,
  },
  actionButtons: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
  manageButton: {
    backgroundColor: '#6B7280',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
  },
  manageButtonActive: {
    backgroundColor: '#3B82F6',
  },
  manageButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
  manageButtonTextActive: {
    color: '#FFFFFF',
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
  },
});