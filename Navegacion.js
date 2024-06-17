import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import INICIO from "./Inicio";
import TAB1 from './Tab1';
import TAB2 from "./Tab2";
import MENU from "./Menu";

export default class Navegacion extends Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }
  
    render() {
      const Stack = createNativeStackNavigator();
      return (
      <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Menu" component={MENU} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  }

//Falta poner más pantallas, además en App.tsx debo de modificar el valor
//En App.tsx se debe poner:
//import INICIO from "./Navegacion"
//Yo tengo import INICIO from "/.INICIO"
