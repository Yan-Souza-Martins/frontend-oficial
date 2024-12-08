import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        const userId = await AsyncStorage.getItem("userId");

        if (token && userId) {
          // Aqui você pode verificar se o token é válido
          setUserData({ token, userId });
        }
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    };

    loadUserData();
  }, []);

  const login = async (token, userId) => {
    try {
      await AsyncStorage.setItem("accessToken", token);
      await AsyncStorage.setItem("userId", userId);
      setUserData({ token, userId });
    } catch (error) {
      console.error("Erro ao salvar dados de login:", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("userId");
      setUserData(null);
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
