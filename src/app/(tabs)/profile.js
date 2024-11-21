import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';
import { Ionicons } from '@expo/vector-icons';

export default function SideBarProfile() {
  const [showModal, setShowModal] = useState(false); // Controla o estado do modal
  const [email, setEmail] = useState('email-user'); // Exemplo de estado para dados do usuário
  const [username, setUsername] = useState('Usuário'); // Exemplo de estado para dados do usuário
  const router = useRouter();

  const handleProfile = () => {
    router.push('/inserirLocal');
  };

  // Função para redirecionar para a página de edição de dados
  const handleEditUser = () => {
    router.push('/putUser'); // Redireciona para a página /putUser
  };

  const handleSaveChanges = () => {
    // Aqui você pode adicionar a lógica para salvar as alterações do usuário
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
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.ola}>{email}</Text>
          </View>
          <TouchableOpacity onPress={handleEditUser}>  {/* Alterado aqui */}
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

      {/* Modal para editar dados do usuário */}
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
  header: {
    backgroundColor: '#0097B2',
    width: '100%',
    height: '50%',
    alignItems: 'center',
    position: 'absolute',
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
    marginLeft: 20
  },
  ola: {
    fontSize: 18,
    marginTop: 10,
    marginRight: 160
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
    fontWeight: 'bold'
  },
  sair: {
    justifyContent: 'flex-end',
    paddingBottom: 50
  },
  carlinhos: {
    flexDirection: 'column'
  },
  icon: {
    marginLeft: 10,
    position: "fixed",
    top: 150,
    right: 10
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
