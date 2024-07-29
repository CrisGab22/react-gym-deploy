import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import UserScreen from "./UserScreen"
import ShopScreen from './shop/ShopScreen';
const Menu = ({ setIsAuthenticated }) => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Shop') {
                        iconName = focused ? 'storefront' : 'storefront-outline';
                    } else if (route.name === 'User') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                headerStyle: styles.headerStyle,
                headerTitleStyle: styles.titleStyle,
                headerTitle: "Spartan Academy",
                headerLeft: () => (
                    <Image
                        source={require('../assets/images/icono.png')}
                        style={styles.headerImage}
                    />
                ),
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Shop" component={ShopScreen} />
            <Tab.Screen name="User">
                {props => <UserScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    headerStyle: {
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#424a5c',
    },
    headerImage: {
        height: 40,
        width: 120,
        resizeMode: 'contain',
    },
    tabBar: {
        backgroundColor: '#424a5c',
    },
    titleStyle: {
        color: 'white',
        fontFamily: "Roboto"
    },
});

export default Menu;