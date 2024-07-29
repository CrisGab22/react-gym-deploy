import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { products } from '../../data/productsData';
import ModalComponent from './ModalShop';
import ProductCard from './ProductCard';
const ShopScreen = () => {
    const [cartItems, setCartItems] = useState(products);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [totales, setTotales] = useState({ count: 0, total: 0 });

    const handleAddToCart = (product) => {
        const copia = cartItems.map(x => {
            if (x.id !== product.id)
                return x
            else {
                let cantidadNueva = x.count + 1
                return { ...x, count: cantidadNueva }
            }
        })
        setTotales({
            count: copia.reduce((acum, x) => {
                acum += x.count
                return acum
            }, 0),
            total: copia.reduce((acum, x) => {
                acum += (x.count * x.price)
                return acum
            }, 0),
        })
        setCartItems(copia)
    }

    const handleRemoveFromCart = (product) => {

        const copia = cartItems.map(x => {
            if (x.id !== product.id)
                return x
            else {
                let cantidadNueva = x.count > 0 ? x.count - 1 : 0
                return { ...x, count: cantidadNueva }
            }
        })

        setTotales({
            count: copia.reduce((acum, x) => {
                acum += x.count
                return acum
            }, 0),
            total: copia.reduce((acum, x) => {
                acum += (x.count * x.price)
                return acum
            }, 0),
        })
        setCartItems(copia)
    };

    const handleConfirmPurchase = useCallback(() => {
        setCartItems(products);
        setTotales({ count: 0, total: 0 })
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={cartItems}
                renderItem={({ item }) => (
                    <ProductCard
                        key={item.id}
                        product={item}
                        onAdd={handleAddToCart}
                        onRemove={handleRemoveFromCart}
                    />
                )}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.list}
                columnWrapperStyle={styles.columnWrapper}
            />
            <View style={styles.cartContainer}>
                <TouchableOpacity
                    style={[styles.cartButton, { backgroundColor: totales.count > 0 ? '#0070BA' : '#aaa' }]}
                    onPress={() => setIsModalVisible(true)}
                    disabled={totales.count === 0}
                >
                    <Icon name="paypal" size={20} color="white" />
                    <Text style={styles.cartButtonText}>Ir a pagar ({totales.count})</Text>
                </TouchableOpacity>
            </View>
            <ModalComponent
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                total={totales.total.toFixed(2)}
                onConfirmPurchase={handleConfirmPurchase}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: "center"
    },
    list: {
        alignItems: 'center',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
        margin: 10,
        padding: 10,
        width: Dimensions.get('window').width / 2 - 20,
    },
    productImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    productPrice: {
        fontSize: 14,
        color: '#333',
        marginBottom: 10,
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    counterButton: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        padding: 5,
        marginHorizontal: 5,
    },
    counterButtonText: {
        color: 'white',
        fontSize: 18,
    },
    counterText: {
        fontSize: 18,
    },
    cartButton: {
        flexDirection: 'row',
        justifyContent: "center",
        backgroundColor: '#007bff',
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    cartButtonText: {
        color: 'white',
        fontSize: 18,
        marginLeft: 10,
    },
});

export default ShopScreen;
