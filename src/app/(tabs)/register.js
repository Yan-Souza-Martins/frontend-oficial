import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const BASE_URL = "http://localhost:5000"; // Ajuste para o IP do backend se necessário

export default function SignUp() {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
  });
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSignUp = async () => {
    // Validações de campos
    if (!form.nome || !form.email || !form.telefone || !form.senha || !form.confirmarSenha) {
      alert("Todos os campos são obrigatórios.");
      return;
    }

    // Validação de senhas
    if (form.senha !== form.confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    if (form.senha.length < 6) {
      alert("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    // Validação do telefone (11 caracteres, apenas números)
    const telefoneRegex = /^[0-9]{11}$/;
    if (!telefoneRegex.test(form.telefone)) {
      alert("O telefone deve ter 11 dígitos.");
      return;
    }

    // Validação do email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(form.email)) {
      alert("Email inválido.");
      return;
    }

    setIsLoading(true); // Início do carregamento

    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: form.nome,
          email: form.email,
          telefone: form.telefone,
          senha: form.senha,
          confirmarSenha: form.confirmarSenha,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        setForm({ nome: "", email: "", telefone: "", senha: "", confirmarSenha: "" });
        router.push("/login"); // Redireciona para o login
      } else {
        alert(`Erro ao cadastrar: ${data.error || "Erro desconhecido."}`);
      }
    } catch (error) {
      console.error("Erro ao registrar:", error);
      alert("Erro ao se conectar ao servidor. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false); // Fim do carregamento
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SPORT'S MAP</Text>
      </View>

      <View style={styles.formContainer}>
        <Feather name="user" size={50} color="#0097B2" style={styles.icon} />
        <Text style={styles.title}>Crie Sua Conta</Text>
        <Text style={styles.subtitle}>
          Crie sua conta para adicionar pontos esportivos ao nosso App!
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={form.nome}
          onChangeText={(value) => handleInputChange("nome", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={form.email}
          onChangeText={(value) => handleInputChange("email", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          keyboardType="phone-pad"
          value={form.telefone}
          maxLength={11} // Limita a 11 caracteres
          onChangeText={(value) => handleInputChange("telefone", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={form.senha}
          onChangeText={(value) => handleInputChange("senha", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          secureTextEntry
          value={form.confirmarSenha}
          onChangeText={(value) => handleInputChange("confirmarSenha", value)}
        />

        <TouchableOpacity
          style={[styles.button, isLoading ? { backgroundColor: "#ccc" } : {}]}
          onPress={handleSignUp}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Processando..." : "Criar Conta"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Já tem uma conta?{" "}
          <Text style={styles.link} onPress={() => router.push("/login")}>
            Entrar
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = {
  container: { flexGrow: 1, backgroundColor: "#f2f2f2" },
  header: {
    backgroundColor: "#0097B2",
    width: "100%",
    height: "50%",
    alignItems: "center",
    position: "absolute",
  },
  headerText: { color: "#fff", fontSize: 40, fontWeight: "bold", marginTop: 40 },
  formContainer: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginTop: "30%",
    alignSelf: "center",
  },
  icon: { marginBottom: 10 },
  title: { fontSize: 20, fontWeight: "bold", color: "#333", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#555", textAlign: "center", marginBottom: 20 },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#0097B2",
    width: "100%",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  footerText: { fontSize: 14, color: "#333", marginTop: 15 },
  link: { color: "#0097B2", fontWeight: "bold" },
};
