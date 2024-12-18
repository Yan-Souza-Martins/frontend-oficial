

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para gerenciar o token
import { useRouter } from 'expo-router';
import Header from '../../components/Header';
import { FontAwesome } from '@expo/vector-icons';

export default function ListModalidades() {
  const [modalidades, setModalidades] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch inicial para carregar as modalidades
  useEffect(() => {
    const fetchModalidades = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/modalidades'); // Troque pelo IP real
        const data = await response.json();

        if (response.ok) {
          setModalidades(data);
        } else {
          Alert.alert('Erro', data.error || 'Não foi possível carregar as modalidades.');
        }
      } catch (error) {
        console.error('Erro ao buscar modalidades:', error);
        Alert.alert('Erro', 'Erro ao conectar com o servidor.');
      } finally {
        setLoading(false);
      }
    };

    fetchModalidades();
  }, []);

  // Função para redirecionar para a página de adição
  const handleAddModalidade = () => {
    router.push('/inserirModalidade');
  };

  // Função para redirecionar para a página de edição
  const handleEditModalidade = (id) => {
    router.push(`/putModalidade?id=${id}`);
  };

  // Função para recuperar o token armazenado
  const getToken = async () => {
    try {
      return await AsyncStorage.getItem('authToken');
    } catch (error) {
      console.error('Erro ao recuperar o token:', error);
      return null;
    }
  };

  // Função para deletar modalidade
  const handleDeleteModalidade = async (id) => {
    console.log("Tentando deletar modalidade com ID:", id);
    try {
      const response = await fetch(`http://localhost:5000/modalidades/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        setModalidades((prev) => prev.filter((modalidade) => modalidade.id !== id));
        Alert.alert('Sucesso', 'Modalidade deletada com sucesso!');
      } else {
        const data = await response.json();
        Alert.alert('Erro', data.error || 'Não foi possível deletar a modalidade.');
      }
    } catch (error) {
      console.error('Erro ao deletar modalidade:', error);
      Alert.alert('Erro', 'Erro ao conectar com o servidor.');
    }
  };
  
  // Renderização de cada card de modalidade
  const renderModalidadeCard = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.urlImage }} style={styles.icon} />
      <Text style={styles.modalidadeText}>{item.nome}</Text>
      <View style={styles.actionsContainer}>
        {/* Botão de editar */}
        <TouchableOpacity onPress={() => handleEditModalidade(item.id)}>
          <Image source={require('../../../assets/pen.png')} style={styles.actionIcon} />
        </TouchableOpacity>
        {/* Botão de deletar */}
        <TouchableOpacity onPress={() => handleDeleteModalidade(item.id)}>
          <FontAwesome name="trash" size={24} color="red" style={styles.actionIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header texto="Lista de Modalidades" />

      {loading ? (
        <ActivityIndicator size="large" color="#0078AA" style={styles.loadingIndicator} />
      ) : (
        <FlatList
          data={modalidades}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderModalidadeCard}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={handleAddModalidade}>
        <Text style={styles.addButtonText}>Inserir nova Modalidade</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    loadingIndicator: {
        marginTop: 20,
    },
    listContainer: {
        padding: 16,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    icon: {
        width: 50,
        height: 50,
        marginRight: 12,
    },
    modalidadeText: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    addButton: {
        backgroundColor: '#0078AA',
        paddingVertical: 14,
        borderRadius: 25,
        margin: 16,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    actionsContainer: {
        flexDirection: 'row', // Dispor os ícones em linha
        alignItems: 'center', // Centralizar os ícones verticalmente
        gap: 10, // Espaçamento entre os ícones
    },
    actionIcon: {
        marginLeft: 10, // Espaçamento adicional se necessário
        height: 24, // Altura padrão para os ícones
        width: 24, // Largura padrão para os ícones
        resizeMode: 'contain', // Garantir que as imagens não fiquem distorcidas
    },
});
