import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import React from 'react';
import producto1 from "../../assets/images/producto1.png"
import producto2 from "../../assets/images/producto2.png"
import producto3 from "../../assets/images/producto3.png"
import producto4 from "../../assets/images/producto4.png"
import producto5 from "../../assets/images/producto5.png"
import producto6 from "../../assets/images/producto6.png"
import producto7 from "../../assets/images/producto7.png"
const ProductCard = ({ product, onAdd, onRemove }) => {

    const isPC = Platform.OS === 'web'; // Utiliza Platform.OS para detectar plataforma web


    let CardWith = 0
    if (!isPC) {
        CardWith = Dimensions.get('window').width * 0.45
    } else {
        CardWith = 200
    }

    // Desestructura el producto recibido
    const { id, image, name, price, count } = product;

    const handleAdd = () => {
        // Se añade un producto al carrito
        onAdd(product);
    };

    const handleRemove = () => {
        // Se quita un producto del carrito
        onRemove(product);
    };

    const styles = StyleSheet.create({
        card: {
            backgroundColor: '#ffffff',
            borderRadius: 10,
            padding: 15,
            margin: 5,
            alignItems: 'center',
            width: CardWith,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 3,
        },
        productImage: {
            width: '100%',
            height: 150,
            borderRadius: 10,
        },
        productName: {
            fontSize: 18,
            fontWeight: 'bold',
            marginTop: 10,
        },
        productPrice: {
            fontSize: 16,
            color: '#888',
            marginTop: 5,
        },
        counterButton: {
            width: 40,
            height: 40,
            borderRadius: 5,
            backgroundColor: '#ddd',
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 5,
        },
        counterButtonText: {
            fontSize: 24,
            fontWeight: 'bold',
        },
        counterContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
        },
        counterText: {
            fontSize: 18,
            fontWeight: 'bold',
        },
    });


    return (
        <View style={styles.card} key={id}>
            <Image source={id == 1 ? producto1 :
                id == 2 ? producto2 :
                    id == 3 ? producto3 :
                        id == 4 ? producto4 :
                            id == 5 ? producto5 :
                                id == 6 ? producto6 :
                                    producto7
            } style={styles.productImage} />
            <Text style={styles.productName}>{name}</Text>
            <Text style={styles.productPrice}>${price}</Text>
            <View style={styles.counterContainer}>
                <TouchableOpacity style={styles.counterButton} onPress={handleRemove}>
                    <Text style={styles.counterButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.counterText}>{count}</Text>
                <TouchableOpacity style={styles.counterButton} onPress={handleAdd}>
                    <Text style={styles.counterButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

};


export default ProductCard;