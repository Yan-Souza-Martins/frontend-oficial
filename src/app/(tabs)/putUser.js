import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import jwt_decode from "jwt-decode"; // Certifique-se de importar corretamente como 'jwt_decode'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/Header";

export default function PutUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userId, setUserId] = useState(null);

  // Função para carregar o userId (public_id) do token JWT
  useEffect(() => {
    const loadUserIdFromToken = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        if (!token) {
          Alert.alert("Erro", "Token não encontrado! Faça login novamente.");
          return;
        }

        console.log("Token recuperado:", token); // Log para verificar o token

        // Use jwt_decode (certifique-se de que está instalado corretamente)
        const decodedToken = jwt_decode(token);
        console.log("Token decodificado:", decodedToken); // Log para verificar o token decodificado

        if (decodedToken && decodedToken.public_id) {
          setUserId(decodedToken.public_id);
          console.log("Public ID carregado:", decodedToken.public_id);
        } else {
          Alert.alert("Erro", "Erro ao carregar informações do usuário.");
        }
      } catch (error) {
        console.error("Erro ao carregar o public_id do token:", error.message); // Log detalhado do erro
        Alert.alert("Erro", "Erro ao processar o token de autenticação.");
      }
    };

    loadUserIdFromToken();
  }, []);

  // Função para salvar as alterações no backend
  const handleSaveChanges = async () => {
    if (!userId) {
      Alert.alert("Erro", "Usuário não identificado. Faça login novamente.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("accessToken");
      const response = await fetch(`http://localhos`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Sucesso", "Alterações salvas com sucesso!");
        console.log("Dados atualizados:", data);
      } else {
        Alert.alert("Erro", `Erro ao atualizar: ${data.error}`);
        console.error("Erro no servidor:", data);
      }
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
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
