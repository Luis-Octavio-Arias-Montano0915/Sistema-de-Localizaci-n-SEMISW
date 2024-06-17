import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SMSListener, { SMSListenerComponent } from './SMSListener';
import { addListener } from './SMSListener';


export default class SMSA extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            smsMessages: [], //Arreglo que almacena los mensajes sms
        };
        this.handleNewMessage = this.handleNewMessage.bind(this);
        
    }

    componentDidMount() {
        //Suscribirse al evento de nuevos sms
        //SMSListener.addListener(this.handleNewMessage);
    }

    //Maneja los nuevos sms recibidos
    handleNewMessage(message){
        //agrega el nuevo mensaje al estado
        this.setState(prevState => ({
            smsMessages: [...prevState.smsMessages, message],
        }));
    }

    
    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.heading}>
                Mensajes SMS recibidos:
                {/* Mensajes sms renderizados*/}
                {this.state.smsMessages.map((message, index) => (
                    <View key={index} style={styles.messageContainer}>
                        <Text>De: {message.originatingAddress}</Text>
                        <Text>Mensaje: {message.body} </Text>
                    </View>
                ))}
            </Text>
                {/* Aqui se usa SMSListenerComponen con la prop de numero filtrado */ }
                <SMSListenerComponent filterPhoneNumber="(650) 555-1212" />
        </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    messageContainer: {
        marginBottom: 10,
    },
   });




/*
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Alert } from 'react-native';
import SMSListener from './SMSListener';

export default class SMSA extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            smsMessages: [], //Arreglo que almacena los mensajes sms
        };
        this.handleNewMessage = this.handleNewMessage.bind(this);
        
    }

    componentDidMount() {
        //Suscribirse al evento de nuevos sms
        SMSListener.addListener(this.handleNewMessage);
    }

    //Maneja los nuevos sms recibidos
    handleNewMessage(message){
        //agrega el nuevo mensaje al estado
        this.setState(prevState => ({
            smsMessages: [...prevState.smsMessages, message],
        }));
    }

    
    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.heading}>
                Mensajes SMS recibidos:
               
                {this.state.smsMessages.map((message, index) => (
                    <View key={index} style={styles.messageContainer}>
                        <Text>De: {message.originatingAddress}</Text>
                        <Text>Mensaje: {message.body} </Text>
                    </View>
                ))}
            </Text>
     
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    messageContainer: {
        marginBottom: 10,
    },
   });
*/