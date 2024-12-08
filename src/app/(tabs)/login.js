import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://localhost:5000"; // Ajuste para o endereço do backend

const Login = () => {
  const [form, setForm] = useState({ email: "", senha: "" }); // Estado para o formulário
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
  const router = useRouter(); // Para navegação

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleLogin = async () => {
    console.log("Login iniciado...");
  
    if (!form.email || !form.senha) {
      Alert.alert("Campos obrigatórios", "Por favor, preencha o e-mail e a senha.");
      return;
    }
  
    setIsLoading(true);
  
    try {
      console.log("Enviando requisição para o backend...");
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, senha: form.senha }),
      });
  
      const result = await response.json();
      console.log("Resposta recebida:", result);
  
      if (response.ok && result.success) {
        console.log("Resposta bem-sucedida do backend. Verificando dados...");
  
        const token = result.token;
        const user = result.user;
  
        if (token && user) {
          // Salva o token e userId no AsyncStorage
          await AsyncStorage.setItem("accessToken", token);
          await AsyncStorage.setItem("userId", String(user.id));
  
          console.log("UserID salvo:", user.id);
  
          Alert.alert(`Bem-vindo(a), ${user.nome || "Usuário"}!`);
          router.push("/profile"); // Redireciona para o perfil
        } else {
          console.error("Dados incompletos recebidos do backend:", result);
          Alert.alert("Erro", "Dados inválidos recebidos. Tente novamente.");
        }
      } else {
        console.error("Erro recebido do backend:", result.error);
        Alert.alert("Erro", result.error || "Erro ao fazer login.");
      }
    } catch (error) {
      console.error("Erro de conexão:", error.message);
      Alert.alert("Erro ao tentar se conectar ao servidor.");
    } finally {
      setIsLoading(false);
      console.log("Login finalizado.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        value={form.email}
        onChangeText={(value) => handleInputChange("email", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={form.senha}
        onChangeText={(value) => handleInputChange("senha", value)}
      />
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#0097B2",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#80C7D4",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Login;
