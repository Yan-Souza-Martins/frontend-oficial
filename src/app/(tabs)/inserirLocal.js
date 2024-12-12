import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function AddSportPoint() {
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSport, setSelectedSport] = useState(null);
  const [form, setForm] = useState({
    endereco: '',
    numero: '',
    bairro: '',
    cidade: '',
    cep: '',
  });

  const router = useRouter();

  // Carregar as modalidades esportivas do backend
  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await fetch('http://localhost:5000/modalidades'); // Endpoint do backend
        const data = await response.json();

        if (response.ok) {
          setSports(data);
        } else {
          Alert.alert('Erro', data.error || 'Erro ao carregar modalidades.');
        }
      } catch (error) {
        console.error('Erro ao carregar modalidades:', error);
        Alert.alert('Erro', 'Erro interno ao carregar modalidades.');
      } finally {
        setLoading(false);
      }
    };

    fetchSports();
  }, []);



  // Enviar o formulário ao backend
  const usuarioId = 1; // ID do usuário autenticado (fixo ou obtido de outro lugar)

  const handleSubmit = async () => {
    if (!selectedSport) {
      Alert.alert('Erro', 'Por favor, selecione uma modalidade.');
      return;
    }
  
    const isEmptyField = Object.values(form).some((field) => field.trim() === '');
    if (isEmptyField) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos do endereço.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/pontos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          modalidadeId: selectedSport.id,
          usuarioId: usuarioId,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        Alert.alert('Sucesso', 'Ponto esportivo adicionado com sucesso!');
        router.push('/'); // Redireciona para a página inicial ou outra página desejada
      } else {
        Alert.alert('Erro', data.error || 'Erro ao adicionar ponto esportivo.');
      }
    } catch (error) {
      console.error('Erro ao adicionar ponto esportivo:', error);
      Alert.alert('Erro', 'Erro interno ao adicionar ponto esportivo.');
    }
  };
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0097B2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Ponto Esportivo</Text>

      <Text style={styles.label}>Selecione uma Modalidade:</Text>
      {sports.map((sport) => (
        <TouchableOpacity
          key={sport.id}
          style={[styles.sportButton, selectedSport?.id === sport.id && styles.selectedSportButton]}
          onPress={() => setSelectedSport(sport)}
        >
          <Text style={styles.sportText}>{sport.nome}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.label}>Endereço:</Text>
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={form.endereco}
        onChangeText={(text) => setForm({ ...form, endereco: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Número"
        value={form.numero}
        onChangeText={(text) => setForm({ ...form, numero: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Bairro"
        value={form.bairro}
        onChangeText={(text) => setForm({ ...form, bairro: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={form.cidade}
        onChangeText={(text) => setForm({ ...form, cidade: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="CEP"
        value={form.cep}
        onChangeText={(text) => {
          if (/^\d{0,5}-?\d{0,3}$/.test(text)) {
            setForm({ ...form, cep: text });
          }
        }}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  sportButton: {
    padding: 10,
    backgroundColor: '#0097B2',
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  selectedSportButton: {
    backgroundColor: '#005f73',
  },
  sportText: {
    color: '#fff',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#0097B2',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
