import * as Location from 'expo-location';
import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import { useRouter } from 'expo-router';

const CreateClientLocationScreen = () => {
    const router = useRouter();

    const [location, setLocation] = useState(null);
    const [gotActualLocation, setGotActualLocation] = useState(false);
    const [markedMap, setMarkedMap] = useState(false);
    const [streetName, setStreetName] = useState('');
    const mapRef = useRef(null);

    const fitToMarkers = (location) => {
      if (mapRef.current && location) {
        mapRef.current.fitToCoordinates([location], {
          edgePadding: { top: 500, right: 500, bottom: 500, left: 500 },
          animated: true,
        });
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
        setGotActualLocation(true)
    }, []);

    const handleMapPress = async (event) => {
        const { coordinate } = event.nativeEvent;
        setLocation({
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
        });

        // Reverse geocoding to get the street name
        try {
            const address = await Location.reverseGeocodeAsync({
                latitude: coordinate.latitude,
                longitude: coordinate.longitude,
            });

            if (address.length > 0) {
                const { street, city, region } = address[0];
                let addressString = ''
                addressString += street
                addressString += city ? `, ${city}` : ''
                // addressString += region ? `, ${region}` : ''

                setStreetName(addressString);
            }
        } catch (error) {
            console.error('Error during reverse geocoding', error);
        }
        setMarkedMap(true)
    };

    const serializedData = encodeURIComponent(JSON.stringify({location: {lat: location?.latitude, lng: location?.longitude}, streetName: streetName}));

    return (
        <>
            <SafeAreaView style={{ zIndex: 1000, position: 'absolute', top: 0, left: 0, right: 0, alignItems: 'center'}}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View className='w-[35px] h-[35px]' style={{ position: 'absolute', left: 10, top: 0, bottom: 0 }}>
                        <CustomButton icon="back" iconType={3} handlePress={() => router.back()} />
                    </View>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', flex: 1, fontSize: 18, marginTop: 10, marginLeft: 35 }}>
                        Marcar Ubicacion de Cliente
                    </Text>
                </View>
            </SafeAreaView>
            <View style={{flex: 1}} className="items-center justify-center">
                <MapView
                    ref={mapRef}
                    style={{ width: '100%', height: '100%'}}
                    initialRegion={{
                        latitude: location?.latitude,
                        longitude: location?.longitude,
                    }}
                    onPress={handleMapPress} // Add this line
                >
                    <Marker coordinate={location} />
                </MapView>
                {
                    !gotActualLocation ?
                    <View className='h-[60px] mt-7 absolute bottom-5'><CustomButton title="Obtener ubicación actual" handlePress={getCurrentLocation} /></View>
                    :
                    <></>
                }
                                {
                    !markedMap && gotActualLocation ?
                    <View className='h-[60px] w-[300px] absolute bottom-8 rounded-xl bg-white border-black-100 justify-center'><Text className='text-center'>Marque la casa del cliente usando el mapa</Text></View>
                    :
                    <></>
                }
                {
                    markedMap && gotActualLocation ?
                    <View className='h-[60px] w-[300px] absolute bottom-8'><CustomButton title="Continuar" handlePress={() => router.push(`/create-client?data=${serializedData}`)} /></View>
                    :
                    <></>
                }
        </View>
      </>
    );
};

export default CreateClientLocationScreen;
