import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import icono from '../assets/images/icono.png'
const LoginScreen = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = () => {
        if (username.toUpperCase() === 'USER' && password === '123') {
            setIsAuthenticated(true);
            navigation.navigate('Menu');
        } else {
            Alert.alert('Error', 'Credenciales incorrectas');
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={icono}
                style={styles.image}
            />
            <Text style={styles.label}>Username:</Text>
            <TextInput
                style={styles.input}
                value={username.trim()}
                onChangeText={(text) => setUsername(text)}
                placeholder="Enter username"
            />
            <Text style={styles.label}>Password:</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder="Enter password"
                secureTextEntry
            />
            <Button title="Iniciar Sesión" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#424a5c',
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        backgroundColor: "#FFF",
        color: "#000",
    },
    label: {
        fontSize: 16,
        marginBottom: 4,
        color: "#FFF"
    },
    image: {
        backgroundColor: '#424a5c',
        width: "90%",
        maxWidth: 500,
        alignSelf: "center"
    }
});

export default LoginScreen;
