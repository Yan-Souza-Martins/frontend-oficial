import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import { Image } from 'react-native-web';

export default function PutUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveChanges = () => {
    console.log('Alterações salvas:', { name, email, phone, password, confirmPassword });
    // Lógica para enviar dados ao servidor
  };

  return (
    <View style={styles.container}>
      <Header texto="Atualizar conta do Sport’s Map" />

      <View style={styles.form}>
        <View style={styles.avatar}>
        <Image
            source={require('../../../assets/iconProfile.png')}
            style={styles.perfilImage}
          />
        </View>
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
  avatar: {
    marginBottom: 20,
    alignItems: 'center',
  },
  avatarIcon: {
    fontSize: 60,
    color: '#0078AA',
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
  perfilImage: {
    width: 80,
    height: 80
  }
});
