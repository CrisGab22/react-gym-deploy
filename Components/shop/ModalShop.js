import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ModalComponent = ({ isVisible, onClose, total, onConfirmPurchase }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCVC, setCardCVC] = useState('');
    const [cardBrand, setCardBrand] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleConfirm = () => {
        setIsSuccess(true);
        onConfirmPurchase(); // Llama la función para vaciar el carrito
    };

    const handleCardNumberChange = (text) => {
        const formattedText = text.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1-');
        setCardNumber(formattedText);
    };

    const handleCardExpiryChange = (text) => {
        const formattedText = text
            .replace(/\D/g, '')
            .replace(/(\d{2})(?=\d)/g, '$1/')
            .slice(0, 5); // Limitar a MM/AA
        setCardExpiry(formattedText);
    };

    return (
        <Modal isVisible={isVisible} onBackdropPress={() => !isSuccess && onClose()}>
            <View style={styles.modalContent}>
                {isSuccess ? (
                    <View style={styles.successContainer}>
                        <Icon name="check-circle" size={60} color="green" />
                        <Text style={styles.successText}>Compra realizada con éxito</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={() => {
                            onClose(); // Cierra el modal
                            setIsSuccess(false); // Restablece el estado
                        }}>
                            <Text style={styles.closeButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
                        <Text style={styles.modalTitle}>Total: ${total}</Text>
                        <Text style={styles.modalSubtitle}>Ingrese los datos de su tarjeta:</Text>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Marca de la tarjeta:</Text>
                            <Picker
                                selectedValue={cardBrand}
                                style={styles.picker}
                                onValueChange={(itemValue) => setCardBrand(itemValue)}
                            >
                                <Picker.Item label="Visa" value="visa" />
                                <Picker.Item label="MasterCard" value="mastercard" />
                                <Picker.Item label="Amex" value="amex" />
                            </Picker>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Número de tarjeta:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Número de tarjeta"
                                value={cardNumber}
                                onChangeText={handleCardNumberChange}
                                keyboardType="numeric"
                                maxLength={19} // 16 dígitos más 3 guiones ejemplo: 1111-2222-3333-4444 
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Fecha de expiración (MM/AA):</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Fecha de expiración (MM/AA)"
                                value={cardExpiry}
                                onChangeText={handleCardExpiryChange}
                                keyboardType="numeric"
                                maxLength={5} // MM/AA
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>CVC:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="CVC"
                                value={cardCVC}
                                onChangeText={setCardCVC}
                                keyboardType="numeric"
                                maxLength={3} // CVC de 3 dígitos
                            />
                        </View>

                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={onClose}>
                                <Text style={styles.modalButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, { backgroundColor: cardNumber && cardExpiry && cardCVC ? '#007bff' : '#aaa' }]}
                                onPress={handleConfirm}
                                disabled={!cardNumber || !cardExpiry || !cardCVC}
                            >
                                <Text style={styles.modalButtonText}>Confirmar</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalSubtitle: {
        fontSize: 16,
        marginBottom: 10,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 10,
    },
    inputLabel: {
        fontSize: 14,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        width: '100%',
    },
    picker: {
        height: 50,
        width: '100%',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    cancelButton: {
        backgroundColor: '#ff0000',
    },
    modalButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    successContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
    },
    successText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'green',
        marginVertical: 10,
    },
    closeButton: {
        backgroundColor: '#6D7995',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
        marginTop: 20,
    },
    closeButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ModalComponent;
