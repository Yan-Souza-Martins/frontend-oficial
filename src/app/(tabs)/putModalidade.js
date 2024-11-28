import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';

export default function PutModalidade() {
    const [modalidade, setModalidade] = useState({ nome: '', icone: '' });
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { query } = router;  // Obter o objeto query

    const id = query?.id;  // Verifica se o id existe dentro de query

    // Função para buscar os dados da modalidade
    useEffect(() => {
        const fetchModalidade = async () => {
            if (!id) return; // Se não tiver id, não faz a requisição

            setLoading(true);
            try {
                const response = await fetch(`http://localhost:5000/modalidades/${id}`);
                const data = await response.json();
                setModalidade(data); // Preenche os campos com os dados existentes
            } catch (error) {
                console.error('Erro ao buscar modalidade:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchModalidade();
    }, [id]);

    // Função para salvar as alterações
    const handleSave = async () => {
        if (!id) return; // Se não tiver id, não faz a requisição

        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/modalidades/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(modalidade),
            });

            if (response.ok) {
                router.push('/listModalidades'); // Redireciona para a lista após salvar
            } else {
                console.error('Erro ao salvar modalidade');
            }
        } catch (error) {
            console.error('Erro ao atualizar modalidade:', error);
        } finally {
            setLoading(false);
        }
    };

    // Função para alterar os valores dos inputs
    const handleChange = (field, value) => {
        setModalidade((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <View style={styles.container}>
            <Header texto="Editar Modalidade" />

            {loading ? (
                <ActivityIndicator size="large" color="#0078AA" style={styles.loadingIndicator} />
            ) : (
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput
                        style={styles.input}
                        value={modalidade.nome}
                        onChangeText={(text) => handleChange('nome', text)}
                    />
                    <Text style={styles.label}>Ícone (URL)</Text>
                    <TextInput
                        style={styles.input}
                        value={modalidade.icone}
                        onChangeText={(text) => handleChange('icone', text)}
                    />
                    
                    <TouchableOpacity style={styles.button} onPress={handleSave}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    loadingIndicator: {
        marginTop: 20,
    },
    formContainer: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        margin: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 16,
        paddingLeft: 8,
    },
    button: {
        backgroundColor: '#0078AA',
        paddingVertical: 14,
        borderRadius: 25,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});