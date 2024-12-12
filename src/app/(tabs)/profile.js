import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const BASE_URL = "http://localhost:5000"; // Altere para o IP do backend, se necessário

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const userId = await AsyncStorage.getItem("userId"); // Pega o ID do usuário do AsyncStorage
        const token = await AsyncStorage.getItem("accessToken");
  
        if (!userId || !token) {
          Alert.alert("Sessão Expirada", "Por favor, faça login novamente.");
          router.push("/login");
          return;
        }
  
        const response = await fetch(`${BASE_URL}/info/${userId}`, { // Passando o userId pela URL
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Enviando o token no cabeçalho
          },
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setUserData(data); // Atualiza os dados do usuário no estado
        } else {
          Alert.alert("Erro", data.error || "Erro ao carregar as informações do usuário.");
          router.push("/login");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error.message);
        Alert.alert("Erro", "Erro ao se conectar ao servidor.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, []);

  // Handle account deletion
  const confirmDeleteAccount = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("accessToken");

      if (!userId || !token) {
        Alert.alert("Erro", "Você precisa estar logado para excluir sua conta.");
        return;
      }

      const response = await fetch(`${BASE_URL}/delete/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso", "Conta excluída com sucesso!");
        await AsyncStorage.clear(); // Limpa todos os dados salvos localmente
        router.push("/register");
      } else {
        Alert.alert("Erro", data.error || "Erro ao excluir a conta. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao excluir conta:", error.message);
      Alert.alert("Erro", "Erro ao se conectar ao servidor. Tente novamente.");
    } finally {
      setIsModalVisible(false);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); // Remove dados do usuário
      Alert.alert("Sucesso", "Logout realizado com sucesso.");
      router.push("/login");
    } catch (error) {
      console.error("Erro ao realizar logout:", error.message);
      Alert.alert("Erro", "Não foi possível realizar o logout.");
    }
  };

  const navigateToUpdateUser = () => {
    router.push("/putUser"); // Navega para a página de atualização de usuário
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0097B2" />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.center}>
        <Text>Não foi possível carregar as informações do usuário.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Conta do Sport's Map</Text>
      </View>

      <View style={styles.profileContainer}>
        <MaterialIcons name="account-circle" size={80} color="#0097B2" />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{userData.nome || "Nome do Usuário"}</Text>
          <Text style={styles.profileEmail}>{userData.email || "email@exemplo.com"}</Text>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={navigateToUpdateUser}>
          <MaterialIcons name="edit" size={24} color="#0097B2" />
        </TouchableOpacity>
      </View>

      <View style={styles.optionsContainer}>
      <TouchableOpacity
        style={[styles.button, { marginTop: 40 }]}
        onPress={() => router.push('/inserirLocal')}
      >
        <FontAwesome name="gear" size={24} color="white" />
        <Text style={styles.buttonText}>Gerencie as Modalidades</Text>
      </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Atualizar Pontos Esportivos Existentes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Termos de Uso</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Sobre Nós</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={handleLogout}>
          <Text style={styles.optionText}>Sair</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.option, styles.deleteButton]} onPress={() => setIsModalVisible(true)}>
          <Text style={[styles.optionText, styles.deleteText]}>Excluir Conta</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Excluir Conta</Text>
            <Text style={styles.modalMessage}>
              Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.
            </Text>
            <View style={styles.modalButtons}>
              <Button title="Cancelar" onPress={() => setIsModalVisible(false)} color="#0078AA" />
              <Button title="Excluir" onPress={confirmDeleteAccount} color="#FF0000" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: { backgroundColor: "#0097B2", padding: 15, alignItems: "center" },
  headerText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 2,
  },
  profileInfo: { flex: 1, marginLeft: 10 },
  profileName: { fontSize: 18, fontWeight: "bold" },
  profileEmail: { fontSize: 14, color: "#555" },
  optionsContainer: { marginHorizontal: 20 },
  option: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 10, elevation: 1 },
  optionText: { fontSize: 16, color: "#333" },
  deleteButton: { backgroundColor: "#ffdddd" },
  deleteText: { color: "#ff0000" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: { backgroundColor: "#FFF", padding: 20, borderRadius: 10, width: "80%", alignItems: "center" },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  modalMessage: { fontSize: 16, textAlign: "center", marginBottom: 20 },
  modalButtons: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
});

export default Profile;
