import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location'; //API de localización

export default function App() {
  const [location, setLocation] = useState(null); //Geolocalización
  const [errorMsg, setErrorMsg] = useState(null); //Error

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync(); //Pide al usuario permiso, mientras la aplicación está en primer plano. Devuelve promesa
      if (status !== 'granted') { //Si no se lo ha dado, produce un error
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location); //Convertimos la location a string
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/*
Recordar para siguiente versión:
Fórmula de una circunferencia: (x - h)^2 + (y - k)^2 = r^2
*/

/*
Para acceder a uno solo de los parámetros de location (p.e: latitud):
location.coords.latitude

*/