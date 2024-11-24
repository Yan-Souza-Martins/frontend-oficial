import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode'; // Certifique-se de importar jwt-decode
import Header from '../../components/Header';
import { Ionicons } from '@expo/vector-icons';

export default function SideBarProfile() {
  const [showModal, setShowModal] = useState(false); // Controla o estado do modal
  const [email, setEmail] = useState(''); // Armazena o email do usuário
  const [username, setUsername] = useState(''); // Armazena o nome do usuário
  const router = useRouter();
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        console.log("Token recuperado:", token);  // Verifique o token
  
        if (token) {
          const decodedToken = jwt_decode(token);
          console.log("Decoded token:", decodedToken);  // Verifique os dados do token
  
          if (decodedToken && decodedToken.name && decodedToken.email) {
            setUserInfo({
              name: decodedToken.name,
              email: decodedToken.email,
            });
            console.log("User info set:", decodedToken.name, decodedToken.email);  // Verifique o valor
          } else {
            console.log("Nome ou email não encontrado no token.");
          }
        } else {
          console.log("Token não encontrado.");
        }
      } catch (error) {
        console.error('Erro ao carregar o perfil:', error);
      }
    };
  
    fetchUserProfile();
  }, []);
  
  const handleProfile = () => {
    router.push('/inserirLocal');
  };

  const handleEditUser = () => {
    router.push('/putUser'); // Redireciona para a página /putUser
  };

  const handleSaveChanges = () => {
    console.log('Alterações salvas');
    setShowModal(false); // Fecha o modal após salvar
  };

  return (
    <View style={styles.container}>
      <Header texto={'Conta do Sport’s Map'} />

      <View style={styles.perfilContainer}>
        <View style={styles.usuario}>
          <Image
            source={require('../../../assets/iconProfile.png')}
            style={styles.perfilImage}
          />
           <View style={styles.carlinhos}>
            <Text style={styles.username}>{userInfo?.name || 'Usuário'}</Text> {/* Exibe o nome */}
            <Text style={styles.ola}>{userInfo?.email || 'email-user'}</Text> {/* Exibe o email */}
          </View>
          <TouchableOpacity onPress={handleEditUser}>
            <Ionicons name="pencil" size={20} color="black" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      

      <br />

      <TouchableOpacity style={styles.textContainer} onPress={handleProfile}>
        <Text style={styles.Text}>Inserir Local Esportivo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.textContainer} onPress={() => router.push('/putPontos')}>
        <Text style={styles.Text}>Atualizar Pontos Esportivos Existentes</Text>
      </TouchableOpacity>

      <br />

      <TouchableOpacity style={styles.textContainer} onPress={() => router.push('/termos')}>
        <Text style={styles.Text}>Termos de Uso</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.textContainer} onPress={() => router.push('/aboutUs')}>
        <Text style={styles.Text}>Sobre Nós</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.textContainer} onPress={() => router.push('/register')}>
        <Text style={styles.Text}>Cadastrar-se</Text>
      </TouchableOpacity>

      <View style={styles.excluir}>
        <TouchableOpacity style={styles.textContainer2}>
          <Text style={styles.Textex}>Excluir minha conta</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Dados</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Nome de Usuário"
            />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="E-mail"
            />
            <Button title="Salvar" onPress={handleSaveChanges} />
            <Button title="Cancelar" onPress={() => setShowModal(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  perfilContainer: {
    alignItems: 'flex-start',
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  perfilImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
    marginLeft: 20,
  },
  ola: {
    fontSize: 18,
    marginTop: 10,
    marginRight: 160,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  textContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc',
    backgroundColor: '#ffffff',
  },
  textContainer2: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc',
    backgroundColor: 'red',
  },
  Text: {
    fontSize: 16,
  },
  usuario: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  excluir: {
    justifyContent: 'flex-end',
  },
  Textex: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sair: {
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  carlinhos: {
    flexDirection: 'column',
  },
  icon: {
    marginLeft: 10,
    position: 'fixed',
    top: 150,
    right: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
  },
  ola: {
    fontSize: 18,
    marginTop: 10,
    marginRight: 160,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: '100%',
    borderRadius: 5,
  },
});
