import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://localhost:5000"; // URL do seu backend

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Função para buscar os dados do usuário ao carregar a página
    const fetchUserData = async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");

      if (!accessToken) {
        setError("Token não encontrado. Usuário não autenticado.");
        router.push("/login");
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/getUserInfo`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUserData(data); // Definindo os dados do usuário no estado
        } else {
          setError(data.error || "Erro ao carregar os dados.");
        }
      } catch (err) {
        setError("Erro de conexão com o servidor.");
        console.error(err);
      }
    };

    fetchUserData(); // Chama a função ao carregar o componente
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("user");
    router.push("/login");
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
        <Button title="Tentar Novamente" onPress={() => router.push("/login")} />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.info}>Nome: {userData.name}</Text>
      <Text style={styles.info}>Email: {userData.email}</Text>
      <Button title="Sair" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
  error: {
    fontSize: 18,
    color: "red",
    marginBottom: 20,
  },
});

export default Profile;
