import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header';
import { Ionicons } from '@expo/vector-icons';

export default function SideBarProfile() {
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal de exclusão
  const [userInfo, setUserInfo] = useState({ name: 'Usuário', email: 'email-user' });
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const name = await AsyncStorage.getItem('userName');
        const email = await AsyncStorage.getItem('userEmail');
        if (name || email) {
          setUserInfo({
            name: name || 'Usuário',
            email: email || 'email-user',
          });
        }
      } catch (error) {
        console.error('Erro ao carregar o perfil:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleDeleteAccount = async () => {
    // Lógica de exclusão de conta
    try {
      // Aqui você pode adicionar a chamada ao backend para excluir a conta
      const response = await fetch('http://localhost:5000/deleteAccount', { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userInfo.email,
        }),
      });

      if (response.ok) {
        alert('Conta excluída com sucesso.');
        // Redireciona para a tela de login ou página inicial
        router.push('/login');
      } else {
        alert('Erro ao excluir a conta. Tente novamente mais tarde.');
      }
    } catch (error) {
      console.error('Erro ao excluir conta:', error);
      alert('Erro ao excluir conta. Tente novamente mais tarde.');
    }
    setShowDeleteModal(false);
  };

  const handleLogout = async () => {
    try {
      // Verifica se o token está no armazenamento local
      const token = await AsyncStorage.getItem('accessToken');
      console.log('Token encontrado antes do logout:', token);
  
      if (!token) {
        console.warn('Token não encontrado no armazenamento local.');
        return;
      }
  
      // Continua com o processo de logout
      const response = await fetch('http://localhost:5000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  // Certifique-se de que o token está sendo enviado corretamente
        },
        body: JSON.stringify({ accessToken: token }),
      });
  
      if (response.ok) {
        console.log('Logout realizado no servidor.');
  
        // Remove o token do armazenamento local
        await AsyncStorage.removeItem('accessToken'); // Use o nome correto do item, que é 'accessToken'
        console.log('AsyncStorage limpo. Redirecionando para login.');
  
        // Redireciona para a página de login
        router.push('/login');
      } else {
        const errorData = await response.json();
        console.error('Erro no logout do servidor:', errorData.error);
      }
    } catch (error) {
      console.error('Erro ao processar logout:', error);
    }
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
            <Text style={styles.username}>{userInfo.name}</Text>
            <Text style={styles.ola}>{userInfo.email}</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/putUser')}>
            <Ionicons name="pencil" size={20} color="black" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.textContainer} onPress={() => router.push('/inserirLocal')}>
        <Text style={styles.Text}>Inserir Local Esportivo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.textContainer} onPress={() => router.push('/putPontos')}>
        <Text style={styles.Text}>Atualizar Pontos Esportivos Existentes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.textContainer} onPress={() => router.push('/termos')}>
        <Text style={styles.Text}>Termos de Uso</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.textContainer} onPress={() => router.push('/aboutUs')}>
        <Text style={styles.Text}>Sobre Nós</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.textContainer} onPress={() => router.push('/register')}>
        <Text style={styles.Text}>Cadastrar-se</Text>
      </TouchableOpacity>

      <TouchableOpacity
  style={styles.logoutButton}
  onPress={handleLogout}
>
  <Text style={styles.logoutText}>Sair</Text>
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
  logoutButton: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});
