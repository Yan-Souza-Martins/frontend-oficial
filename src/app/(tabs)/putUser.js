import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import jwtDecode from 'jwt-decode'; // Importando a biblioteca para decodificar o JWT
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header';



export default function PutUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userId, setUserId] = useState(null);

  // Carregar o userId do token JWT
  useEffect(() => {
    const loadUserIdFromToken = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken'); // Pega o token JWT do AsyncStorage
        if (token) {
          const decodedToken = jwt_decode(token); // Decodifica o token JWT
  
          // Aqui, altere para usar 'public_id' no lugar de 'userId'
          if (decodedToken && decodedToken.public_id) {
            setUserId(decodedToken.public_id); // Define o public_id
            console.log('Public ID recuperado do token:', decodedToken.public_id);
          } else {
            console.error('Payload do token não contém public_id!');
            alert('Erro ao carregar informações do usuário. Tente novamente.');
          }
        } else {
          console.error('Token não encontrado!');
          alert('Você não está autenticado. Por favor, faça login novamente.');
        }
      } catch (error) {
        console.error('Erro ao carregar o public_id do token:', error);
        alert('Erro ao processar o token de autenticação. Tente novamente.');
      }
    };
  
    loadUserIdFromToken();
  }, []);
  
  // Função que salva as alterações no backend
  const handleSaveChanges = async () => {
    if (!userId) {
      console.error('Erro: userId não definido');
      alert('Erro: usuário não identificado. Tente novamente.');
      return;
    }
  
    try {
      // Enviar os dados para o backend
      const response = await fetch(`http://localhost:5000/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await AsyncStorage.getItem('accessToken')}`, // Usando o token
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
          confirmPassword,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Alterações salvas:', data);
        alert('Alterações salvas com sucesso!');
        // Aqui você pode exibir uma mensagem de sucesso ou redirecionar o usuário
      } else {
        console.error('Erro ao salvar alterações:', response.statusText);
        alert('Erro ao salvar alterações. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
      alert('Erro inesperado ao salvar alterações. Tente novamente.');
    }
  };
  
  return (
    <View style={styles.container}>
      <Header texto="Atualizar Conta" />

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
          <Text style={styles.buttonText}>Salvar Alterações</Text>
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
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc',
    marginBottom: 15,
    fontSize: 16,
    padding: 8,
  },
  button: {
    backgroundColor: '#0078AA',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
