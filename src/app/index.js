import { ScrollView, StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function Init() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => router.replace("/home"), 3000); // Redireciona para "/home" após 3 segundos
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={{ flex: 1, marginTop: 100, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 30 }}>Sport's Map</Text>
        <Text style={{ fontSize: 16, marginVertical: 10 }}>Pratique esporte em todos os lugares</Text>
        <ActivityIndicator style={{ marginVertical: 30 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
