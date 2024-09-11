import axios from 'axios';
import { router } from 'expo-router';
import React, { useState, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, Image, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import FormField from '../../components/FormField';
import MapView, { Marker } from 'react-native-maps';

const CreateClient = () => {
    const [image, setImage] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [clientName, setClientName] = useState("");
    const [location, setLocation] = useState(null);
    const mapRef = useRef(null);

    const requestPermission = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert('Perdón, necesitamos la cámara para que funcione!');
            }
        }
    };

    const takePhoto = async () => {
        await requestPermission();
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const fitToMarkers = (location) => {
      if (mapRef.current && location) {
        mapRef.current.fitToCoordinates([location], {
          edgePadding: { top: 500, right: 500, bottom: 500, left: 500 },
          animated: true,
        });
      }
    };

    const handleChangeData = (value, propertyName) => {
        if (propertyName === "phoneNumber") { setPhoneNumber(value); }
        else if (propertyName === "name") { setClientName(value); }
    };

    const createClient = async () => {
        const clientData = {
            name: clientName,
            phoneNumber: phoneNumber,
            location: location,
            // add other fields as needed
        };

        try {
            const response = await axios.post('http://192.168.100.4:3000/clients/createClient', clientData);
            console.log('Client created successfully:', response.data);
            router.back();
        } catch (error) {
            console.log('Error:', error.message);
        }
    };

    const getCurrentLocation = useCallback(async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const locationObj = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }

        setLocation(locationObj);
        fitToMarkers(locationObj)
    }, []);

    const handleMapPress = (event) => {
        const { coordinate } = event.nativeEvent;
        setLocation({
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
        });
    };

    return (
      <SafeAreaView>
      <ScrollView>
      <View className="h-full w-full">
        <Text className='text-center font-bold'>Crear Cliente</Text>
            <View className="w-full justify-center min-h-[83vh] px-4">
              <MapView
                  ref={mapRef}
                  style={styles.map}
                  initialRegion={{
                      latitude: location?.latitude,
                      longitude: location?.longitude,
                      // latitudeDelta: 0.0922,
                      // longitudeDelta: 0.0421,
                  }}
                  zoom={13}
                  onPress={handleMapPress} // Add this line
              >
                  <Marker coordinate={location} />
              </MapView>
              <FormField title="Nombre de Cliente" placeholder="Nombre de Cliente" handleChangeText={(e) => this.handleChangeData(e, "name")} otherStyles="mt-7" keyboardType="email-address"/>
              <FormField title="Numero de Celular" placeholder="Numero de celular" keyboardType="numeric" otherStyles="mt-7" handleChangeText={(value) => this.handleChangeData(value, "phoneNumber")}/>
              {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
              <View className='h-[60px] mt-7'><CustomButton title="Obtener ubicación actual" handlePress={getCurrentLocation} /></View>
              <View className='h-[60px] mt-7'><CustomButton title="Sacar foto de casa" handlePress={takePhoto} /></View>
              <View className='h-[60px] mt-7'><CustomButton title="Crear Cliente" handlePress={createClient}/></View>
            </View>
      </View>
      </ScrollView>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    formContainer: {
        width: '100%',
        display: 'flex',
        paddingHorizontal: 16,
    },
    image: {
        width: 200,
        height: 200,
        marginVertical: 10,
    },
    buttonContainer: {
        marginVertical: 20,
    },
    map: {
        width: '100%',
        height: 200,
        marginTop: 10,
    },
});

export default CreateClient;
