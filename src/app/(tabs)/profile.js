import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import Header from '../../components/Header';
import { Ionicons } from '@expo/vector-icons';

export default function SideBarProfile() {
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal de exclusão
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
          const decodedToken = jwt_decode(token);
          if (decodedToken?.name && decodedToken?.email) {
            setUserInfo({
              name: decodedToken.name,
              email: decodedToken.email,
            });
          } else {
            console.warn("Token não contém informações de nome ou email.");
          }
        }
      } catch (error) {
        console.error('Erro ao carregar o perfil:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleDeleteAccount = () => {
    console.log('Conta excluída'); // Aqui pode ser feita a lógica para exclusão da conta
    setShowDeleteModal(false);
  };

  return (
    <View style={styles.container}>
      <Header texto="Conta do Sport’s Map" />

      <View style={styles.perfilContainer}>
        <View style={styles.usuario}>
          <Image
            source={require('../../../assets/iconProfile.png')}
            style={styles.perfilImage}
          />
          <View style={styles.carlinhos}>
            <Text style={styles.username}>{userInfo.name || 'Usuário'}</Text>
            <Text style={styles.ola}>{userInfo.email || 'email-user'}</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/putUser')}>
            <Ionicons name="pencil" size={20} color="black" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: 20 }} />

      <TouchableOpacity style={styles.textContainer} onPress={() => router.push('/inserirLocal')}>
        <Text style={styles.Text}>Inserir Local Esportivo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.textContainer} onPress={() => router.push('/putPontos')}>
        <Text style={styles.Text}>Atualizar Pontos Esportivos Existentes</Text>
      </TouchableOpacity>

      <View style={{ height: 20 }} />

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
        <TouchableOpacity
          style={styles.textContainer2}
          onPress={() => setShowDeleteModal(true)}
        >
          <Text style={styles.Textex}>Excluir minha conta</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de Exclusão */}
      <Modal
        visible={showDeleteModal}
        animationType="fade"
        transparent
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, styles.modalDeleteContent]}>
            <Text style={styles.modalTitle}>Confirmação</Text>
            <Text style={styles.modalText}>Tem certeza de que deseja excluir sua conta?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonConfirm]}
                onPress={handleDeleteAccount}
              >
                <Text style={styles.modalButtonText}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setShowDeleteModal(false)}
              >
                <Text style={styles.modalButtonText}>Não</Text>
              </TouchableOpacity>
            </View>
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
  carlinhos: {
    flexDirection: 'column',
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
  modalDeleteContent: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    width: '80%',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  modalButtonConfirm: {
    backgroundColor: 'red',
  },
  modalButtonCancel: {
    backgroundColor: '#dcdcdc',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
