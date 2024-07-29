import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Platform } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { userData } from '../data/userData';
import { visitasData } from '../data/visitasData';

const HomeScreen = () => {
    const screenWidth = Dimensions.get('window').width;
    const isPC = Platform.OS === 'web'; // Utiliza Platform.OS para detectar plataforma web

    // Define tamaños en función de la plataforma
    const iconSize = isPC ? screenWidth * 0.3 : screenWidth * 0.6; // 5% para PC, 10% para móvil
    const qrCodeSize = isPC ? screenWidth * 0.3 : screenWidth * 0.6; // 30% para PC, 60% para móvil    

    const generateQrValue = () => {
        return `https://www.google.com?timestamp=${Date.now()}`;
    };

    const [duration, setDuration] = useState(1); // Duración en segundos (5 minutos)
    const [qrValue, setQrValue] = useState(generateQrValue());
    const [showReload, setShowReload] = useState(false); // Nuevo estado para mostrar el botón de recarga

    useEffect(() => {
        const timer = setInterval(() => {
            setDuration(prevDuration => {
                if (prevDuration > 0) {
                    return prevDuration - 1;
                } else {
                    setShowReload(true); // Mostrar el botón de recarga cuando el tiempo se agote
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleReload = () => {
        setQrValue(generateQrValue());
        setDuration(300);
        setShowReload(false); // Ocultar el ícono de recarga y reiniciar el temporizador

    };

    const formatDayMonth = (timestamp) => {
        const date = moment(timestamp);
        return `${date.format('D')} ${date.format('MMM').toUpperCase()}`;
    };

    const formatDate = (timestamp) => {
        return moment(timestamp).format('DD MMM YYYY - HH:mm:ss');
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.qrContainer}>
                    {showReload ? (
                        <TouchableOpacity style={styles.reloadButton} onPress={handleReload}>
                            <Icon name="refresh" size={iconSize} color="#ffffff" />
                        </TouchableOpacity>
                    ) : (
                        <QRCode
                            value={qrValue}
                            size={qrCodeSize}
                            bgColor="#d3d7df"
                            fgColor="#d3d7df"
                        />
                    )}
                    <Text style={styles.timerText}>
                        Disponible por: {formatTime(duration)} minutos
                    </Text>
                </View>
                <View style={styles.progressBarContainer}>
                    <Text style={styles.progressText}>{userData.keysTotal - userData.keysUsed}/{userData.keysTotal} Llaves Disponibles</Text>
                    <View style={styles.progressBarBackground}>
                        <View style={[styles.progressBarFill, { width: `${((userData.keysTotal - userData.keysUsed) / userData.keysTotal) * 100}%` }]} />
                    </View>
                </View>
                <Text style={styles.historyTitle}>Historial de visitas</Text>
                <ScrollView style={styles.historyContainer}>
                    {visitasData.map(item => (
                        <View style={styles.historyItem} key={item.id}>
                            <View style={styles.historyDetails}>
                                <Text style={styles.historyText}><Text style={styles.boldText}>Fecha y Hora:</Text> {formatDate(item.timestamp)}</Text>
                                <Text style={styles.historyText}><Text style={styles.boldText}>Sucursal:</Text> {item.branch}</Text>
                                <Text style={styles.historyText}><Text style={styles.boldText}>Observaciones:</Text> {item.observations}</Text>
                            </View>
                            <View style={styles.calendarContainer}>
                                <Icon name="calendar-today" size={40} color="#424a5c" />
                                <Text style={styles.calendarDate}>{formatDayMonth(item.timestamp)}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    qrContainer: {
        backgroundColor: "#E2E4EA",
        justifyContent: 'center',
        alignSelf: "center",
        alignItems: 'center',
        marginTop: 20,
        width: '75%',
        padding: 20,
        borderRadius: 20,
    },
    timerText: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#424a5c',
    },
    reloadButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7C87A0',
        borderRadius: 10,
        padding: 10,
    },
    historyContainer: {
        padding: 10,
        paddingBottom: 30,
    },
    historyTitle: {
        textAlign: "center",
        fontSize: 22,
        marginTop: 30,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#424a5c',
    },
    historyItem: {
        alignSelf: "center",
        backgroundColor: '#C5CAD5',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        width: '98%',
    },
    lastHistoryItem: {
        marginBottom: 30,
    },
    historyDetails: {
        flex: 1,
    },
    calendarContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    calendarDate: {
        fontSize: 14,
        color: '#424a5c',
        fontWeight: 'bold',
    },
    historyText: {
        fontSize: 16,
        color: '#424a5c',
    },
    boldText: {
        color: "#424a5c",
        fontWeight: 'bold',
    },
    progressText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 5,
    },
    progressBarContainer: {
        marginTop: 10,
        alignSelf: "center",
        width: "90%"
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
});

export default HomeScreen;
