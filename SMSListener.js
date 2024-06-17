import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Dimensions } from 'react-native';
import SmsListener from 'react-native-android-sms-listener';
import firestore from './firebase';

const phoneNumberToFilter = "3316192672"; // Número de teléfono para filtrar mensajes

export function addListener(callback) {
  useEffect(() => {
    const handleMessage = message => {
      if (message.originatingAddress === phoneNumberToFilter) {
        // Extraer coordenadas del mensaje
        const messageParts = message.body.split(',');
        const coordinates = messageParts.length > 1 ? messageParts[1].trim() : ''; // Asume que las coordenadas están en el segundo segmento del mensaje

        // Guarda el mensaje en la base de datos de Firebase
        saveCoordinatesToDataBase(coordinates)
          .then(() => console.log('Coordenadas guardadas en Firebase'))
          .catch(error => console.error('Error al guardar las coordenadas:', error));

        callback(message);
      }
    };

    // Suscribirse al evento de nuevos mensajes SMS
    SmsListener.addListener(handleMessage);

    return () => {
      // Eliminar la suscripción al desmontar el componente
      SmsListener.removeListener();
    };
  }, []);
}

async function saveCoordinatesToFirestore(coordinates) {
  try {
    await firestore()
      .collection('coordenadasLocalizador')
      .add({
        latitud: parseFloat(coordinates.split(',')[0]), // Convierte la latitud a número
        longitud: parseFloat(coordinates.split(',')[1]) // Convierte la longitud a número
      });
  } catch (error) {
    throw error;
  }
}

export const SMSListenerComponent = ({ onNewMessage, filterPhoneNumber }) => {
  const [smsMessages, setSmsMessages] = useState([]);

  addListener(message => {
    // Agrega el nuevo mensaje al estado
    setSmsMessages(prevMessages => [...prevMessages, message]);
  });

  return (
    <View style={styles.container}>
      {/* Renderiza la lista de mensajes SMS */}
      <FlatList
        data={smsMessages}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>De: <Text style={styles.blackText}>{item.originatingAddress}</Text></Text>
            <Text style={styles.messageText}>Mensaje: <Text style={styles.blackText}> {item.body}</Text></Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  messageText: {
    color: '#000',
  },
  blackText: {
    fontWeight: 'bold',
  },
});

export default SMSListenerComponent;
