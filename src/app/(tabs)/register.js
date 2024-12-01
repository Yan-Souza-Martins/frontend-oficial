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

export default function SignUp() {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: '',               // Alterado de name para nome
    email: '',
    telefone: '',           // Alterado de phone para telefone
    senha: '',
    confirmarSenha: '',
  });

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSignUp = async () => {
    if (!form.nome || !form.email || !form.telefone || !form.senha || !form.confirmarSenha) {
      alert('Todos os campos são obrigatórios.');
      return;
    }

    if (form.senha !== form.confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: form.nome,             // Alterado de name para nome
          email: form.email,
          telefone: form.telefone,     // Alterado de phone para telefone
          senha: form.senha,
          confirmarSenha: form.confirmarSenha,
        }),
      });

      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        setForm({ nome: '', email: '', telefone: '', senha: '', confirmarSenha: '' });
        router.push('/login');
      } else {
        const errorData = await response.json();
        alert(`Erro ao cadastrar: ${errorData.error || 'Erro desconhecido.'}`);
      }
    } catch (error) {
      alert('Erro ao se conectar ao servidor. Tente novamente mais tarde.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SPORT'S MAP</Text>
      </View>

      <View style={styles.formContainer}>
        <Feather name="user" size={50} color="#0097B2" style={styles.icon} />
        <Text style={styles.title}>Crie Sua Conta</Text>
        <Text style={styles.subtitle}>
          Crie sua conta para adicionar pontos esportivos ao nosso App!
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={form.nome}              // Alterado de name para nome
          onChangeText={(value) => handleInputChange('nome', value)}   // Alterado de name para nome
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={form.email}
          onChangeText={(value) => handleInputChange('email', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          keyboardType="phone-pad"
          value={form.telefone}          // Alterado de phone para telefone
          onChangeText={(value) => handleInputChange('telefone', value)} // Alterado de phone para telefone
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={form.senha}
          onChangeText={(value) => handleInputChange('senha', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          secureTextEntry
          value={form.confirmarSenha}
          onChangeText={(value) => handleInputChange('confirmarSenha', value)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Criar Conta</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Já tem uma conta?{' '}
          <Text style={styles.link} onPress={() => router.push('/login')}>
            Entrar
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
    marginTop: '30%',
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
