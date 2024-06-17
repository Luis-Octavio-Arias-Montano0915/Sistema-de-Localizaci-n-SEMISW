// En el archivo Inicio.js
import MenuDrawer from 'react-native-side-drawer';
import React, { Component, useEffect, useState } from 'react';
import { View, Text, PermissionsAndroid, ScrollView, Alert, StyleSheet, Image, Button, FlatList } from 'react-native';
import SmsListener from 'react-native-android-sms-listener';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Conversacion from './Components/Conversacion';
import { NavigationContext } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
//import { enviarMensajeGSM } from './arduinoUtils'


const STORAGE_KEY = 'conversacion';

const conversacionEjemplo = [
  { id: 1, texto: 'Digite la orden', emisor: 'receptor'},
  { id: 2, texto: 'Ubicacion Actual.', emisor: 'usuario'},
  { id: 3, imagenSource: require('./Imagenes/maps.jpg'), emisor: 'receptor'},
  { id: 4, texto: '20.594412 | -103.418838', emisor: 'receptor'},
  { id: 5, texto: 'ATENCION!!! Ha pasado cerca de una CAMARA DE SEGURIDAD', emisor: 'receptor'},
  { id: 6, imagenSource: require('./Imagenes/mapa2.jpg'), emisor: 'receptor'},
  { id: 7, texto: 'DANDO AVISO A LAS AUTORIDADES', emisor: 'receptor'},
  //{ id: 8, texto: 'Actualizacion: Hay una unidad de la Policia siguiendo el rastro del GEOMEXA', emisor: 'recepetor'},
  //{ id: 9, texto: 'Generando actualizaciones automáticas de ubicacion....', emisor: 'receptor'},
  //{ id: 10, texto: 'Aqui tienes: Ubicacion: 135.201321, -48.123456. Hora: 12:40 p.m. Fecha: 11/04/2024'}
];

const ConversacionExample = () => {
  const renderMensaje = ({ item }) => {
    let imageStyle;
    if (item.id === 3){
      imageStyle = styles.imagenMapa1;
    } else if (item.id === 6){
      imageStyle = styles.imagenMapa2;
    }

  return (
              <View key={item.id} style={item.emisor === 'usuario' ? styles.mensajeUsuario : styles.mensajeReceptor}>
                {item.imagenSource ? (
                  //En caso de que el mensaje cumpla con google maps, se mostrará así
                  <Image source={item.imagenSource} style={styles.imageStyle} />
                ) : (
                  <Text style={styles.texto}>{item.texto}</Text>
                )}
                
              </View>
              
  );
}
return (
  <FlatList
  data={conversacionEjemplo}
  renderItem={renderMensaje}
  keyExtractor={item => item.id.toString()}
  style={styles.conversacionContainer}
  scrollEnabled={conversacionEjemplo.length > 4}
  showsVerticalScrollIndicator={false}
  //contentContainerStyle={styles.contenidoConversacion}
  initialNumToRender={4}
  maxToRenderPerBatch={7}
  /> 
  ); 
};


const cargarNuevosMensajes = async () => {
  try {
    //Logica para cargar nuevos mensajes
    const nuevosMensajesGuardados = await AsyncStorage.getItem(STORAGE_KEY);
    if (nuevosMensajesGuardados) {
      return JSON.parse(nuevosMensajesGuardados);
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error al cargar nuevos mensajes:', error);
    return [];
  }
};

const Inicio = () => {
  
  const [mensajes, setMensajes] = useState([]);
  
  useEffect(() => {
    const cargarConversacionDesdeStorage = async () => {
        try {
            const conversacionGuardada = await AsyncStorage.getItem(STORAGE_KEY);
            if (conversacionGuardada) {
                setMensajes(JSON.parse(conversacionGuardada));
            }
        } catch (error) {
            console.error('Error al cargar la conversacion desde el almacenamiento', error);
        }
    };
    cargarConversacionDesdeStorage();
  }, []);

  useEffect(() => {
    const requestSmsPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_SMS,
          {
            title: 'Permiso para leer SMS',
            message: 'Esta aplicación necesita permisos para leer mensajes SMS.',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Permiso concedido');
          startSmsListener();
        } else {
          console.log('Permiso denegado');
            Alert.alert(
                'Permiso Denegado',
                'Esta aplicacion no puede funcionar correctamente sin permisos.\nDeje que la App acceda a los SMS desde ajustes de la Aplicacion.'
            );
        }
      } catch (error) {
        console.error('Error al solicitar permisos:', error);
      }
    };

    const startSmsListener = () => {
      const smsSubscription = SmsListener.addListener(message => {
        const numeroArduino = '+523316192672'; //Numero asociado al Arduino
        // Filtra los mensajes del número específico (ajusta según sea necesario)
        if (message.originatingAddress === numeroArduino) {
            const nuevaConversacion = [message.body, ...mensajes];
          setMensajes(nuevaConversacion);
          guardarConversacionEnStorage(nuevaConversacion);
        }
      });

      // Limpia el oyente al desmontar el componente
      return () => {
        smsSubscription.remove();
      };
    };

    // Llama a la función de solicitud de permisos al cargar el componente
    requestSmsPermission();
  }, [mensajes]);

  const guardarConversacionEnStorage = async conversacion => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(conversacion));        
    } catch (error) {
        console.error('Error al guardar la conversacion en el almacenamiento', error);
    }
  };


  const enviarMensajeAlArduino = mensaje => {
    //Implementando codigo para enviar el mensaje al arduino
    const numeroArduino = '+523316192672'; //Numero asociado al arduino

    enviarMensajeGSM(numeroArduino, mensaje)
    .then(() => {
      console.log('Mensaje enviado al Arduino:', mensaje);
      Alert.alert('Mensaje enviado', 'El mensaje ha sido enviado al Arduino');
    })
    .catch(error => {
      console.error('Error al enviar el mensaje al Arduino:', error);
      Alert.alert('Error', 'No se pudo enviar el mensaje al Arudino. Por favor, intentalo de nuevo');
    });
  };

  const onActualizarMensajes = async () => {
    try {
      //Logica para actualizar los mensajes
      const nuevosMensajes = await cargarNuevosMensajes();
      setMensajes(nuevosMensajes);
    } catch (error) {
      console.error('Error al actualizar los mensajes:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
      <Image
                style={styles.imagen1}
                source={require('./Imagenes/arduino.jpeg')} //La imagen y su dirección 
                />
        <View style={styles.headerTextContainer}>
      <Text style={styles.titulo}>APP DE SEGUIMIENTO</Text>
      <Text style={styles.subtitulo}>LOCALIZADOR GEOMEXA</Text>
      </View>
      </View>
      <View>

        <Text style={styles.textoBienv}>
          COMUNICACIÓN CON TU DISPOSITIVO
        </Text>
      </View>
      <Button title="Actualizar" onPress={onActualizarMensajes} />
      
      <ConversacionExample />
        {/* Mejora 1: utilizar un componente de conversacion */}
      <Conversacion mensajes={mensajes} onEnviarMensaje={enviarMensajeAlArduino}/>
      
      
    </View>
  );
};


const styles= StyleSheet.create({
  /*imagenConversacion: {
    width: 180,
    height: 150,
    marginVertical: 8,
    borderRadius: 7,
    marginBottom: 16,
    alignSelf: 'center',
},*/
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    color: '#4DA7DA',
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    
  },
  subtitulo: {
    fontSize: 20,
    color: '#4DA7DA',
    alignItems: "center",
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    
  },
  imagen1: {
    width: 80,
    height: 50,
    borderRadius: 1,
    marginBottom: 16,
  },
  //Mejora 2: estilo para el contenedor de la conversacion
  conversacionContainer: {
    flex: 1,
    paddingBottom: 306,
    width: '100%',
    //marginTop: 16,
    borderColor: 'blue',
  },
  mensajeUsuario: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1e7ff',
    padding: 8,
    marginVertical: 4,
    borderRadius: 8,
},
mensajeReceptor: {
    alignSelf: 'flex-start',
    backgroundColor: '#e6f7ff',
    padding: 8,
    marginVertical: 4,
    borderRadius: 8,
},
  textoBienv: {
    fontSize: 20,
    color: '#000000',
    alignItems: "center",
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif-thin'
    /*backgroundColor: '#3DA7DA',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    padding: 8,
    borderRadius: 5,
    marginTop: 16,*/
  },
  imagenMapa1: {
    width: 180,
    height: 150,
    marginVertical: 8,
    borderRadius: 7,
    marginBottom: 16,
    alignSelf: 'center',
  },
  imagenMapa2: {
    width: 20,
    height: 20,
    marginVertical: 3,
    borderRadius: 7,
    marginBottom: 16,
    alignSelf: 'center',
  },
});

export default Inicio;
