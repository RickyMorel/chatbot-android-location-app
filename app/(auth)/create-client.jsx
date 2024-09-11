import axios from 'axios';
import { router } from 'expo-router';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import FormField from '../../components/FormField';
import MapView, { Marker } from 'react-native-maps';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firebase, storage } from '../firebaseConfig';
import CustomDropdown from '../../components/CustomDropdown';

const CreateClient = () => {
    const [image, setImage] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [clientName, setClientName] = useState("");
    const [address, setAddress] = useState("");
    const [location, setLocation] = useState(null);
    const [clientLocations, setClientLocations] = useState([]);
    const mapRef = useRef(null);

    useEffect(() => {
        fetchAllClientLocations();
    }, []);

    const fetchAllClientLocations = async () => {
        try {
          const response = await axios.get(`http://192.168.100.4:3000/client-crud/getAllClientZones`);
    
          setClientLocations([...response.data.filter(x => x.includes(',') == false && x != "NO MENSAJEAR")])
        } catch (error) {
          console.log("error", error)
          return error
        }
    };

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
            quality: 0.1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadImageToFirebase = async (imageUri) => {
        console.log("uploadImageToFirebase", imageUri)
        // Fetch the image as a blob
        const response = await fetch(imageUri);
        let blob = await response.blob();

        console.log("response", response)
        console.log("blob", blob)

        const storageRef = ref(storage, `chatbot-house-images/${phoneNumber}_${Date.now()}.jpg`);

        console.log("storageRef", storageRef)

        try {
            const snapshot = await uploadBytes(storageRef, blob)

            console.log("snapshot", snapshot)
            console.log('Uploaded a blob or file!');
    
            const downloadURL = await getDownloadURL(snapshot.ref);

            blob = null;
    
            return downloadURL;
        } catch(err) {
            console.log("error", err)
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
        else if (propertyName === "address") { setAddress(value); }
    };

    const createClient = async () => {
        console.log("createClient!!!")
        const imageUrl = await uploadImageToFirebase(image);

        console.log("imageUrl!!!", imageUrl)

        const clientData = {
            name: clientName,
            address: address,
            phoneNumber: phoneNumber,
            locationPicture: imageUrl,
            locationDescription: '',
            location: location,
        };

        console.log("clientData", clientData)

        try {
            const response = await axios.post('http://192.168.100.4:3000/client-crud/createWithLocation', clientData);
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

   // const hasValidNumber = phoneNumber.length == 12 && phoneNumber.startsWith("595")
    const hasValidNumber = true

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
              <FormField placeholder="Nombre de Cliente" handleChangeText={(e) => handleChangeData(e, "name")} otherStyles="mt-7" keyboardType="text"/>
              <FormField placeholder="(+595) 981 000 000" keyboardType="numeric" value={phoneNumber} otherStyles="mt-7" handleChangeText={(value) => handleChangeData(value, "phoneNumber")}/>
              <View className='mt-7 w-full'><CustomDropdown data={clientLocations.map(x => ({label: x, value: x}))} placeholderText="Elejir Barrio" value={address} handleSelect={(e) => handleChangeData(e, "address")}/></View>
              {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
              <View className='h-[60px] mt-7'><CustomButton title="Obtener ubicación actual" handlePress={getCurrentLocation} /></View>
              <View className='h-[60px] mt-7'><CustomButton title="Sacar foto de casa" handlePress={takePhoto} isLoading={!hasValidNumber}/></View>
              <View className='h-[60px] mt-7'><CustomButton title="Crear Cliente" isLoading={!(hasValidNumber && location != null && address.length > 1 && clientName.length > 1)} handlePress={createClient}/></View>
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
