import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

const Home = () => {
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listVisible, setListVisible] = useState(false);
  const [iconName, setIconName] = useState('arrowright');
  const router = useRouter();

  const toggleSportsList = async () => {
    if (listVisible) {
      setListVisible(false);
      setIconName('arrowright');
    } else {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/modalidades');
        const data = await response.json();
        
        // Verificando a estrutura correta da resposta
        console.log('Resposta da API:', data);

        // Ajuste para tratar o retorno direto com o array de modalidades
        if (Array.isArray(data) && data.length > 0) {
          setSports(data); // Agora você pode diretamente usar 'data'
        } else {
          console.error('Erro ao carregar modalidades:', 'Formato de resposta inesperado');
        }
        setListVisible(true);
        setIconName('arrowdown');
      } catch (error) {
        console.error('Erro ao buscar modalidades:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSelectSport = (sport) => {
    // Redireciona para a tela de pontos, passando o nome da modalidade
    router.push(`/pontos?nome=${sport.nome}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>SPORT'S MAP</Text>

      <TouchableOpacity style={styles.button} onPress={toggleSportsList}>
        <AntDesign name={iconName} size={24} color="white" />
        <Text style={styles.buttonText}>Selecione um Esporte</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { marginTop: 40 }]}
        onPress={() => router.push('/modalidades')}
      >
        <FontAwesome name="gear" size={24} color="white" />
        <Text style={styles.buttonText}>Gerencie as Modalidades</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#0097B2" style={styles.loadingIndicator} />}

      {listVisible && sports.length > 0 && (
        <View style={styles.listContainer}>
          <FlatList
            data={sports}
            keyExtractor={(item) => item.id.toString()}  // Usando 'id' como chave
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.sportButton}
                onPress={() => handleSelectSport(item)}
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
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0097B2',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  listContainer: {
    marginTop: 20,
    width: '80%',
  },
  sportButton: {
    padding: 15,
    backgroundColor: '#0078AA',
    borderRadius: 5,
    marginBottom: 10,
  },
  sportText: {
    color: 'white',
    fontSize: 18,
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

export default Home;
