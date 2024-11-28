import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';

export default function InserirModalidade() {
  const [nome, setNome] = useState('');
  const [urlImagem, setUrlImagem] = useState('');
  const router = useRouter();

  const handleInsertModalidade = async () => {
    if (!nome || !urlImagem) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/modalidades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, icone: urlImagem }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Modalidade inserida com sucesso!');
        router.push('/modalidades/lista'); // Redireciona para a lista de modalidades
      } else {
        throw new Error('Erro ao inserir modalidade.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível inserir a modalidade.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Header texto="Insira uma nova Modalidade" />

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#999"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="URL da Imagem"
          placeholderTextColor="#999"
          value={urlImagem}
          onChangeText={setUrlImagem}
        />

        <TouchableOpacity style={styles.button} onPress={handleInsertModalidade}>
          <Text style={styles.buttonText}>Inserir nova Modalidade</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    width: '90%',
    height: 50,
    backgroundColor: '#0078AA',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
