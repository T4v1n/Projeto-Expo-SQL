import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  Alert
} from 'react-native';
import { adicionarReceita, atualizarReceita } from '../../database/bancoDados';

export const AddEditScreen = ({ route, navigation }) => {
  const { receita, modoEdicao } = route.params || {};
  
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [instrucoes, setInstrucoes] = useState('');

  useEffect(() => {
    if (modoEdicao && receita) {
      setTitulo(receita.titulo);
      setDescricao(receita.descricao);
      setInstrucoes(receita.instrucoes);
    }
  }, [modoEdicao, receita]);

  async function salvar() {
    if (!titulo.trim() || !descricao.trim() || !instrucoes.trim()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      if (modoEdicao) {
        await atualizarReceita(receita.id, titulo.trim(), descricao.trim(), instrucoes.trim());
        Alert.alert("Sucesso", "Receita atualizada com sucesso!");
      } else {
        await adicionarReceita(titulo.trim(), descricao.trim(), instrucoes.trim());
        Alert.alert("Sucesso", "Receita adicionada com sucesso!");
      }
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar receita:', error);
      Alert.alert("Erro", "Não foi possível salvar a receita.");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {modoEdicao ? 'Editar Receita' : 'Nova Receita'}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <Text style={styles.label}>🏷️ Título da Receita</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Churrasco especial"
            value={titulo}
            onChangeText={setTitulo}
            multiline={false}
          />

          <Text style={styles.label}>📝 Descrição</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descrição curta da receita..."
            value={descricao}
            onChangeText={setDescricao}
            multiline={true}
            numberOfLines={3}
            textAlignVertical="top"
          />

          <Text style={styles.label}>🔥 Instruções de Preparo</Text>
          <TextInput
            style={[styles.input, styles.textAreaLarge]}
            placeholder="1. Primeiro passo...&#10;2. Segundo passo...&#10;3. Terceiro passo..."
            value={instrucoes}
            onChangeText={setInstrucoes}
            multiline={true}
            numberOfLines={8}
            textAlignVertical="top"
          />

          <TouchableOpacity style={styles.saveButton} onPress={salvar}>
            <Text style={styles.saveButtonText}>
              {modoEdicao ? '✅ Atualizar Receita' : '➕ Salvar Receita'}
            </Text>
          </TouchableOpacity>
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
  form: {
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
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
    color: '#374151',
  },
  textArea: {
    height: 80,
    paddingTop: 12,
  },
  textAreaLarge: {
    height: 160,
    paddingTop: 12,
  },
  saveButton: {
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 32,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});