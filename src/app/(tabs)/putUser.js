import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/Header";

export default function PutUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userId, setUserId] = useState(null);

  // Carregar o ID do usuário diretamente do AsyncStorage
  useEffect(() => {
    const loadUserIdFromStorage = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (!storedUserId) {
          Alert.alert("Erro", "Usuário não identificado. Faça login novamente.");
          return;
        }
        setUserId(parseInt(storedUserId, 10)); // Converte o ID para número
      } catch (error) {
        console.error("Erro ao carregar o ID do usuário:", error.message);
        Alert.alert("Erro", "Erro ao processar o ID do usuário.");
      }
    };

    loadUserIdFromStorage();
  }, []);

  // Salvar alterações no backend
  const handleSaveChanges = async () => {
    if (!userId) {
      Alert.alert("Erro", "Usuário não identificado. Faça login novamente.");
      return;
    }

    if (password && password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não correspondem.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) {
        Alert.alert("Erro", "Token não encontrado. Faça login novamente.");
        return;
      }

      const body = {};
      if (name) body.nome = name;
      if (email) body.email = email;
      if (phone) body.telefone = phone;
      if (password) body.senha = password;
      if (confirmPassword) body.confirmarSenha = confirmPassword;

      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Sucesso", "Alterações salvas com sucesso!");
        setName(data.user.nome);
        setEmail(data.user.email);
        setPhone(data.user.telefone);
      } else {
        const errorMessage =
          data.error || "Erro desconhecido. Por favor, tente novamente.";
        Alert.alert("Erro", errorMessage);
      }
    } catch (error) {
      console.error("Erro ao salvar alterações:", error.message);
      Alert.alert("Erro", "Erro inesperado. Tente novamente.");
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
    backgroundColor: "#f5f5f5",
  },
  form: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#dcdcdc",
    marginBottom: 15,
    fontSize: 16,
    padding: 8,
  },
  button: {
    backgroundColor: "#0078AA",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
