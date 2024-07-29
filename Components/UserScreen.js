import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Para iconos de logout
import * as data from '../data/userData';
import { useNavigation } from '@react-navigation/native';
const UserScreen = ({ setIsAuthenticated }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState(data.userData);

    const navigation = useNavigation()
    const Logout = () => {
        setIsAuthenticated(false)
        navigation.navigate('Login')
    }
    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (field, value) => {
        // Validar que los campos numéricos solo contengan números
        if (['phone', 'age'].includes(field) && /\D/.test(value)) {
            window.alert('Entrada no válida', 'Por favor, ingrese solo números en los campos numéricos.');
            return;
        }
        if (field == "age" && value > 120) {
            window.alert("Ingrese una edad válida")
            return;
        }
        setUserData({ ...userData, [field]: value });
    };
    const isPC = Platform.OS === 'web'; // Utiliza Platform.OS para detectar plataforma web

    const styles = StyleSheet.create({
        container: {
            flexGrow: 1,
            backgroundColor: '#f0f0f0',
            padding: 20
        },
        photoContainer: {
            alignSelf: 'center',
            textAlignVertical: "center",
            textAlign: "center",
            backgroundColor: "#fff",
            borderRadius: 75,
            marginBottom: 20,
            padding: 1.5,
        },
        photo: {
            width: '100%',
            height: '100%',
            borderRadius: 100,
        },
        title: {
            fontSize: 22,
            fontWeight: 'bold',
            marginBottom: 10,
            textAlign: 'center',
            color: '#424a5c',
        },
        progressText: {
            fontSize: 16,
            textAlign: 'center',
            marginBottom: 5,
        },
        progressBarContainer: {
            marginBottom: 20,
        },
        progressBarBackground: {
            height: 10,
            width: '100%',
            backgroundColor: '#d3d7df',
            borderRadius: 5,
            overflow: 'hidden',
        },
        progressBarFill: {
            height: '100%',
            backgroundColor: '#424a5c',
        },
        formContainer: {
            marginBottom: 10,
            width: '100%',
        },
        formGroup: {
            marginBottom: 10,
        },
        formRow: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        label: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#424a5c',
            marginBottom: 5,
        },
        textInput: {
            height: 40,
            borderColor: '#d3d7df',
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
            paddingVertical: isPC ? 10 : undefined,
            backgroundColor: isEditing ? '#ffffff' : '#e5e5e5',
            flex: 1,
            marginHorizontal: 5,
        },
        button: {
            backgroundColor: isEditing ? '#28a745' : '#6D7995',
            paddingVertical: 10,
            borderRadius: 5,
            marginBottom: 10,
            alignItems: 'center',
            width: '100%',
        },
        buttonText: {
            color: '#ffffff',
            fontSize: 16,
            fontWeight: 'bold',
        },
        logoutButton: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#ff4d4d',
            paddingVertical: 10,
            borderRadius: 5,
            justifyContent: 'center',
            width: '100%',
        },
        logoutText: {
            color: '#ffffff',
            fontSize: 16,
            fontWeight: 'bold',
            marginLeft: 10,
        },
        phoneField: {
            flex: 7,
        },
        ageField: {
            flex: 3,
        },
    });


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.photoContainer}>
                {userData.photo ? (
                    <Image source={{ uri: userData.photo }} style={styles.photo} />
                ) : (
                    <Icon name="person" size={140} color="#424a5c" />
                )}
            </View>
            <Text style={styles.title}>Datos del Usuario</Text>
            <View style={styles.formContainer}>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Nombre</Text>
                    <TextInput
                        style={styles.textInput}
                        value={userData.firstName}
                        editable={isEditing}
                        placeholder="Nombre"
                        onChangeText={(text) => handleChange('firstName', text)}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Apellido</Text>
                    <TextInput
                        style={styles.textInput}
                        value={userData.lastName}
                        editable={isEditing}
                        placeholder="Apellido"
                        onChangeText={(text) => handleChange('lastName', text)}
                    />
                </View>
                <View style={styles.formRow}>
                    <View style={[styles.formGroup, styles.phoneField]}>
                        <Text style={styles.label}>Teléfono</Text>
                        <TextInput
                            style={styles.textInput}
                            value={userData.phone}
                            editable={isEditing}
                            placeholder="Teléfono"
                            maxLength={10}
                            onChangeText={(text) => handleChange('phone', text)}
                        />
                    </View>
                    <View style={[styles.formGroup, styles.ageField]}>
                        <Text style={styles.label}>Edad</Text>
                        <TextInput
                            style={styles.textInput}
                            value={userData.age}
                            editable={isEditing}
                            placeholder="Edad"
                            onChangeText={(text) => handleChange('age', text)}
                        />
                    </View>
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Ciudad</Text>
                    <TextInput
                        style={styles.textInput}
                        value={userData.city}
                        editable={isEditing}
                        placeholder="Ciudad"
                        onChangeText={(text) => handleChange('city', text)}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.textInput}
                        value={userData.email}
                        editable={isEditing}
                        placeholder="Email"
                        onChangeText={(text) => handleChange('email', text)}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={toggleEdit}>
                <Text style={styles.buttonText}>{isEditing ? 'Guardar Cambios' : 'Editar Datos'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={Logout}>
                <Icon name="logout" size={24} color="#ffffff" />
                <Text style={styles.logoutText}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};


export default UserScreen;
