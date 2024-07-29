import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../Components/LoginScreen';
import Menu from '../Components/Menu';

const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
        >
          {props => <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
        </Stack.Screen>

        <Stack.Screen
          name="Menu"
          options={{ headerShown: false }}
        >
          {props => <Menu {...props} setIsAuthenticated={setIsAuthenticated} />}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

