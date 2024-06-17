import React from 'react';
import { View,  StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { Text } from 'react-native-animatable';

const Welcome = () => {
    return (
        <ScrollView style={styles.container}>
          <View style={styles.content}>
            <Text animation="fadeInDown" style={styles.title}>
              Bienvenido a                                                    APP GEOMEXA
            </Text>
    
            <Text animation="fadeIn" style={styles.description}>
              Esta aplicación te ayuda a localizar objetos robados según la ubicación de su localizador.
              Simplemente espere los mensajes que le envía el GEOMEXA.
            </Text>
            
            <View style={styles.commandsContainer}>
                <View style={styles.commandRow}>
              <Text animation="fadeInLeft" style={styles.command}>
                - <Text style={styles.commandName}>Ubicación:</Text> Muestra la ubicación actual del dispositivo.
              </Text>
              <Image
                source={require('./Imagenes/mapwelcome.png')} // Reemplaza con la ruta de tu imagen
                style={styles.commandIcon}
              />
              </View>
              
              <View style={styles.commandRow}>
                <Image
                source={require('./Imagenes/datab.png')}
                style={styles.commandIcon2}
                />
              <Text animation="fadeInLeft" style={styles.command}>
                - <Text style={styles.commandName}>Monitoreo Constante:</Text> Las ubicaciones se insertan al sistema para un mejor monitoreo de la actividad.
              </Text>
              </View>
            </View>
    
            <Text animation="fadeInUp" style={styles.note}>
              Se detectan los mensajes recibidos por el GEOMEXA y los muestra en pantalla, sin importar el dia o la hora que sea.
            </Text>

            <Text animation="fadeInUp" style={styles.note}>
              Abre la opcion "Mensaje" para poder comunicarte con el GEOMEXA
            </Text>
          </View>
        </ScrollView>
      );
    };

    const { width } = Dimensions.get('window');
    const imageWidth = width * 0.8;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //paddingHorizontal: 20,
      paddingHorizontal: '5%', //Para adaptar a pantallas
      backgroundColor: '#E8F0F2',
      //position: 'relative',
      
    },
    content: {
      alignItems: 'center',
      paddingVertical: '5%', //Para adaptar a pantallas
    },
    title: {
      //fontSize: 30,
      fontSize: width * 0.06, //Para adaptar a pantallas
      fontWeight: 'bold',
      color: '#2c3e50',
      //marginVertical: 20,
      marginVertical: '5%', //Para adaptar a pantallas
      textAlign: 'center',
    },
    description: {
      //fontSize: 18,
      fontSize: width * 0.04, //Para adaptar a pantallas
      textAlign: 'center',
      //marginBottom: 20,
      marginBottom: '5%', //Para adaptar a pantallas
      color: '#6C7A89',
    },
    commandsContainer: {
      width: '100%',
      //marginBottom: 20,
      marginBottom: '5%', //Para adaptar a pantallas
    },
    command: {
        flex: 1,
      //fontSize: 16,
      fontSize: width * 0.035,
      color: '#34495e',
    },
    commandRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        //paddingVertical: 10, // Agrega espacio vertical
        //paddingHorizontal: 10, // Agrega espacio horizontal
        paddingVertical: '2%', // Para adaptar a pantalla
        paddingHorizontal: '5%', // Para adaptar a pantalla
        backgroundColor: '#FFFFFF',
        borderRadius: 10, // Bordes redondeados
        //marginBottom: 10, // Separación entre filas
        marginBottom: '5%', //Para adaptar a pantalla
        shadowColor: '#000',
        shadowOpacity: 0.1, // Sombra sutil
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
        elevation: 2,
        marginVertical: 10,
      },
    commandName: {
      fontWeight: 'bold',
      color: '#3498db',
    },
    commandIcon: {
      width: 180,
      height: 100,
      marginVertical: 8,
      borderRadius: 10,
      marginBottom: 10,
      alignSelf: 'center',
    },
    commandIcon2: {
      width: 100,
      height: 120,
      marginVertical: 8,
      borderRadius: 10,
      marginBottom: 10,
      alignSelf: 'center',
    },
    note: {
      //fontSize: 16,
      fontSize: width * 0.04, //Para adaptar a pantallas
      textAlign: 'center',
      color: '#6C7A89',
      marginTop: 20,
    },
  });

export default Welcome;
