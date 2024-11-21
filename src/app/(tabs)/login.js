import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    senha: '',
  });

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleLogin = async () => {
    console.log("Dados enviados para o backend:", form); // Verifique o formato dos dados
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Certifique-se de que o tipo de conteúdo está correto
        },
        body: JSON.stringify(form),
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log('Login bem-sucedido:', data);
        alert('Login realizado com sucesso!');
      } else {
        console.error('Erro no login:', data);
        alert(data.error || 'Erro desconhecido');
      }
    } catch (error) {
      console.error('Erro de rede:', error);
      alert('Erro ao tentar se conectar ao servidor');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>SPORT'S MAP</Text>
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        <Feather name="log-in" size={50} color="#0097B2" style={styles.icon} />
        <Text style={styles.title}>Entrar</Text>
        <Text style={styles.subtitle}>
        Volte a praticar esportes usando <br></br>
        nosso App!
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={form.email}
          onChangeText={(value) => handleInputChange('email', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={form.senha}
          onChangeText={(value) => handleInputChange('senha', value)}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Não tem uma conta?{' '}
          <Text
            style={styles.link}
            onPress={() => router.push('/register')} // Navegação com Expo Router
          >
            Criar conta
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    backgroundColor: '#0097B2',
    width: '100%',
    height: '50%',
    alignItems: 'center',
    position: 'absolute',
  },
  headerText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 40,
    fontFamily: 'Aboreto-Regular',
  },
  formContainer: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    marginTop: '50%', // Para posicionar o formulário logo abaixo do header azul
    alignSelf: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0097B2',
    width: '100%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 14,
    color: '#333',
    marginTop: 15,
  },
  link: {
    color: '#0097B2',
    fontWeight: 'bold',
  },
});
