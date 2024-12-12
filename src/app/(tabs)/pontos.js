import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

const Pontos = () => {
  const [pontos, setPontos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPontos = async () => {
      try {
        const response = await fetch('http://localhost:5000/pontos'); // Endpoint correto
        const data = await response.json();

        if (response.ok) {
          setPontos(data.points); // Recebe os pontos do backend
        } else {
          setError(data.error || 'Erro ao buscar os pontos esportivos.');
        }
      } catch (err) {
        setError('Erro de conexão com o servidor.');
      } finally {
        setLoading(false);
      }
    };

    fetchPontos();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.text}>Carregando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Locais Esportivos</Text>
      <FlatList
        data={pontos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Endereço: {item.endereco}</Text>
            <Text style={styles.cardText}>Número: {item.numero}</Text>
            <Text style={styles.cardText}>Bairro: {item.bairro}</Text>
            <Text style={styles.cardText}>Cidade: {item.cidade}</Text>
            <Text style={styles.cardText}>CEP: {item.cep}</Text>
            <Text style={styles.cardText}>Usuário: {item.usuario.nome}</Text>
            <Text style={styles.cardText}>Email: {item.usuario.email}</Text>
            <Text style={styles.cardText}>
              Modalidade: {item.modalidade?.nome || 'Não especificado'}
            </Text>
            <Text style={styles.cardText}>
              Imagem: {item.modalidade?.urlImage ? 'Sim' : 'Não'}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
    color: '#555',
  },
  text: {
    fontSize: 16,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default Pontos;
