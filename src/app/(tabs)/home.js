import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Importando o useRouter do expo-router

const Home = () => {
  const [sports, setSports] = useState([]); // Lista de esportes
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const [listVisible, setListVisible] = useState(false); // Controle da visibilidade da lista
  const [iconName, setIconName] = useState('arrowright'); // Controle do ícone do botão
  const router = useRouter(); // Hook para navegação com expo-router

  // Função para buscar ou ocultar as modalidades
  const toggleSportsList = async () => {
    if (listVisible) {
      setListVisible(false);
      setIconName('arrowright'); // Voltar o ícone para a seta para a direita
    } else {
      setLoading(true); // Ativa o indicador de carregamento
      try {
        const response = await fetch('http://localhost:5000/modalidades'); // URL do backend
        const data = await response.json();
        setSports(data); // Atualiza o estado com as modalidades
        setListVisible(true); // Mostra a lista ao carregar
        setIconName('arrowdown'); // Altera o ícone para "arrowdown"
      } catch (error) {
        console.error('Erro ao buscar modalidades:', error);
      } finally {
        setLoading(false); // Desativa o carregamento após a requisição
      }
    }
  };

  // Função para navegar para a tela 'pontos' passando o esporte selecionado
  const handleSelectSport = (sport) => {
    // Navega para a página 'pontos' passando o esporte selecionado com o parâmetro 'nome'
    router.push(`/pontos?nome=${sport.nome}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>SPORT'S MAP</Text>

      {/* Botão para alternar entre buscar/ocultar esportes */}
      <TouchableOpacity style={styles.button} onPress={toggleSportsList}>
        <AntDesign name={iconName} size={24} color="white" />
        <Text style={styles.buttonText}>Selecione um Esporte</Text>
      </TouchableOpacity>

      {/* Indicador de carregamento */}
      {loading && <ActivityIndicator size="large" color="#0097B2" style={styles.loadingIndicator} />}

      {/* Lista de esportes */}
      {listVisible && sports.length > 0 && (
        <View style={styles.listContainer}>
          <FlatList
            data={sports}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.sportButton}
                onPress={() => handleSelectSport(item)} // Navega ao clicar no esporte
              >
                <Text style={styles.sportText}>{item.nome}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 500,
    fontFamily: 'Aboreto-Regular',
    position: 'absolute',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0097B2',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: 354,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  listContainer: {
    backgroundColor: '#0097B2',
    borderRadius: 10,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  sportButton: {
    padding: 10,
    backgroundColor: '#0097B2',
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  sportText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'left',
  },
});

export default Home;
