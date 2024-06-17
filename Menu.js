
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import INICIO from './Inicio';
//import CONVERSACION from './Components/Conversacion';
import MAPA from './Mapa';
import WELCOME from './Welcome';
import SMSA from './SmsA';
import { SMSListenerComponent } from './SMSListener';


  
const Tab = createBottomTabNavigator();

const Menu = ()  => {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name=" "
          component={WELCOME}
          
          options={{
            tabBarLabel: '¿Cómo usar?',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="license" color={'#4DA7DA'} size={35}  />
            )
          }}
        />
        <Tab.Screen
          name=" Mensaje "
          component={SMSListenerComponent}
          
          options={{
            tabBarLabel: 'Mensajes',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="message-badge" color={'#4DA7DA'} size={35}  />
            )
          }}
        />
        
          <Tab.Screen
          name=" Localizar  "
          component={MAPA}
          
          options={{
            tabBarLabel: 'Mapa',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="map-marker-radius-outline" color={'#4DA7DA'} size={35}  />
            )
          }}
        />

        
      </Tab.Navigator>
    );
  };

export default Menu;


/*
export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const Tab = createBottomTabNavigator(this.props.tab);
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="INICIO"
          component={INICIO}
          initialParams={{nombre: this.props.route.params.nombre}}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="home" color={'red'} size={35}  />
            )
          }}
          />
          </Tab.Navigator>
        );
      }
    }


    <Tab.Screen
          name=" Introducir datos "
          component={INDATOS}
          
          options={{
            tabBarLabel: 'Introducir data',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="database-settings" color={'#4DA7DA'} size={35}  />
            )
          }}
        />
        
*/