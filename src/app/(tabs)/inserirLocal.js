import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';

export default function SportsSelection() {
  const router = useRouter();
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSports = async () => {
    try {
      const response = await fetch('http://localhost:5000/modalidades'); 
      const data = await response.json();
      setSports(data); 
      setLoading(false); 
    } catch (error) {
      console.error('Erro ao buscar modalidades:', error);
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchSports(); 
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Header texto={"Qual esporte está sendo praticado?"}/>
        <ActivityIndicator size="large" color="#0097B2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header texto={"Qual esporte está sendo praticado?"}/>
     
      <View style={styles.carlinhos2}>
        <View style={styles.listContainer}>
        {sports.map((sport, index) => (
          <TouchableOpacity key={index} style={styles.sportButton}>
            <Text style={styles.sportText}>{sport.nome}</Text>
          </TouchableOpacity>
        ))}
      </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  listContainer: {
    backgroundColor: '#0097B2',
    borderRadius: 10,
    marginTop: 20,  
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
  carlinhos2: {
    width: "100%",
    alignItems: 'center'
  }
});
