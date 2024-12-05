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
          if (
            route.name === 'register' ||
            route.name === 'inserirLocal' ||
            route.name === 'login' ||
            route.name === 'pontos' ||
            route.name === 'putPontos'
          ) {
            iconName = 'user';
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
      <Tabs.Screen name="register" options={{title: '',}} />
      
      {/* Essas telas não terão o botão de aba */}
      <Tabs.Screen name="profile" options={{href: null,}} />
      <Tabs.Screen name="inserirLocal" options={{href: null,}} />
      <Tabs.Screen name="login" options={{href: null,}} />
      <Tabs.Screen name="pontos" options={{href: null,}} />
      <Tabs.Screen name="putPontos" options={{href: null,}} />
      <Tabs.Screen name="putUser" options={{href: null,}} />
      <Tabs.Screen name="modalidades" options={{href: null,}} />
      <Tabs.Screen name="listModalidades" options={{href: null,}} />
      <Tabs.Screen name="inserirModalidade" options={{href: null,}} />
      <Tabs.Screen name="putModalidade" options={{href: null,}} />

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
