import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';

export default function Modalidades() {
    const router = useRouter();

    const handleListNavigation = () => {
        router.push('/listModalidades'); // Substitua pela rota real
    };

    const handleEditModalidade = (id) => {
        router.push(`/putModalidade?id=${id}`); // Substitua pelo nome correto da rota
    };
    

    return (
        <View style={styles.container}>
            {/* Usando o Header existente */}
            <Header texto="Gerenciar Modalidades" />

            {/* Conteúdo principal */}
            <View style={styles.content}>
                <View style={styles.card}>
                    <Image
                        source={require('../../../assets/iconProfile.png')}
                        style={styles.iconImage}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Olá Admin</Text>
                        <Text style={styles.subtitle}>Gerencie as Modalidades</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleListNavigation}>
                    <Text style={styles.buttonText}>Lista de modalidades cadastradas</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 30,
    },
    card: {
        backgroundColor: '#ffffff',
        width: '85%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderWidth: 1,
        borderColor: '#dcdcdc',
        marginBottom: 20,
    },
    iconImage: {
        width: 50,
        height: 50,
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0097B2',
    },
    subtitle: {
        fontSize: 14,
        color: '#808080',
    },
    button: {
        backgroundColor: '#0078AA',
        paddingVertical: 12,
        paddingHorizontal: 24,
        width: '85%',
        alignItems: 'center',
        borderRadius: 35,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
