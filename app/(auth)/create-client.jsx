import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
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
import IconElement from '../../components/IconElement';

const CreateClient = () => {
    const [image, setImage] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [clientName, setClientName] = useState("");
    const [address, setAddress] = useState("");
    const [location, setLocation] = useState(null);
    const [streetName, setStreetName] = useState('');
    const [clientLocations, setClientLocations] = useState([]);
    const { data } = useLocalSearchParams();
    const mapRef = useRef(null);

    useEffect(() => {
        const locationObj = data ? JSON.parse(data) : undefined;

        setLocation(locationObj.location)
        setStreetName(locationObj.streetName)

        fetchAllClientLocations();
    }, []);

    const fetchAllClientLocations = async () => {
        try {
          const response = await axios.get(`http://192.168.0.17:3000/client-crud/getAllClientZones`);
    
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
            aspect: [16, 9],
            quality: 0.1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadImageToFirebase = async (imageUri) => {
        // Fetch the image as a blob
        const response = await fetch(imageUri);
        let blob = await response.blob();

        const storageRef = ref(storage, `chatbot-house-images/${phoneNumber}_${Date.now()}.jpg`);

        try {
            const snapshot = await uploadBytes(storageRef, blob)
    
            const downloadURL = await getDownloadURL(snapshot.ref);

            blob = null;
    
            return downloadURL;
        } catch(err) {
            console.log("error", err)
        }
    };

    const handleChangeData = (value, propertyName) => {
        if (propertyName === "phoneNumber") { setPhoneNumber(value); }
        else if (propertyName === "name") { setClientName(value); }
        else if (propertyName === "address") { setAddress(value); }
    };

    const createClient = async () => {
        const imageUrl = await uploadImageToFirebase(image);

        const clientData = {
            name: clientName,
            address: address,
            phoneNumber: phoneNumber,
            locationPicture: imageUrl,
            locationDescription: '',
            location: location,
        };

        try {
            const response = await axios.post('http://192.168.0.17:3000/client-crud/createWithLocation', clientData);
            console.log("response", response)
            router.back();
            router.back();
        } catch (error) {
            console.log('Error:', error.message);
        }
    };

    const hasValidNumber = phoneNumber.length == 12 && phoneNumber.startsWith("595")

    return (
      <SafeAreaView>
        <ScrollView className="h-full w-full p-5">
            <Text className='text-center font-bold mb-3'>Crear Cliente</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                <Text className='text-center font-bold mr-2'>{`${streetName}`}</Text>
                <IconElement icon={'map-marker-alt'} iconType={4} color='red' iconSize={20}/>
            </View>
            <FormField title="Nombre de Cliente" placeholder="Juana Maria" handleChangeText={(e) => handleChangeData(e, "name")} otherStyles="mt-7" keyboardType="text"/>
            <FormField title="Numero de Cliente" placeholder="(+595) 981 000 000" keyboardType="numeric" value={phoneNumber} otherStyles="mt-7" handleChangeText={(value) => handleChangeData(value, "phoneNumber")}/>
            <View className='mt-7 w-full pb-5'><CustomDropdown data={clientLocations.map(x => ({label: x, value: x}))} placeholderText="Elejir Barrio" value={address} handleSelect={(e) => handleChangeData(e, "address")}/></View>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, alignSelf: 'center' }} />}
            <View className='h-[60px] mt-7'><CustomButton title="Sacar foto de casa" handlePress={takePhoto} isLoading={!hasValidNumber}/></View>
            <View className='h-[60px] mt-7'><CustomButton title="Crear Cliente" isLoading={!(hasValidNumber && location != null && address.length > 1 && clientName.length > 1 && image)} handlePress={createClient}/></View>
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
