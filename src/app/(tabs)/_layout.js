import React from 'react';
import { Tabs } from 'expo-router/tabs';
import { Feather } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

export default function TabNavigator() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: '#0097B2',
          height: 100,
          borderTopWidth: 0,
          padding: 35,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        headerShown: false,
        tabBarIcon: ({ color, focused }) => {
          let iconName;
          if (route.name === 'home') {
            iconName = 'map';
          } else if (route.name === 'profile') {
            iconName = 'user';
          }

          // Se estamos em uma tela "oculta", fazemos o botão de "profile" ficar ativo
          if (
            route.name === 'register' ||
            route.name === 'inserirLocal' ||
            route.name === 'login' ||
            route.name === 'pontos' ||
            route.name === 'putPontos'
          ) {
            iconName = 'user'; // Garantir que "profile" fica ativo
          }

          return (
            <View style={[focused && styles.activeTabContainer]}>
              <Feather name={iconName} size={30} color={color} />
            </View>
          );
        },
      })}
    >
      <Tabs.Screen name="home" options={{ title: '' }} />
      <Tabs.Screen name="profile" options={{ title: '' }} />

      {/* Essas telas não terão o botão de aba */}
      <Tabs.Screen name="register" options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="inserirLocal" options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="login" options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="pontos" options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="putPontos" options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="putUser" options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="modalidades" options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="listModalidades" options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="inserirModalidade" options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="putModalidade" options={{ tabBarButton: () => null }} />

    </Tabs>
  );
}

const styles = StyleSheet.create({
  activeTabContainer: {
    backgroundColor: 'white',
    borderRadius: 35,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 70,
  },
});
