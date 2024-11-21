import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Pontos = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Página de Pontos</Text>
      <Text style={styles.text}>Você está na página de pontos.</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});

export default Pontos;
