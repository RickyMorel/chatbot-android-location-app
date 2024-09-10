import axios from 'axios';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Platform  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import * as ImagePicker from 'expo-image-picker';
import CustomInput from '../../components/CustomInput';
import FormField from '../../components/FormField';

const CreateClient = () => {
    const [image, setImage] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState("")
    const [clientName, setClientName] = useState("")

    const requestPermission = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert('Perdon, necesitamos la camara para que funcione!');
            }
        }
    };

    const takePhoto = async () => {
        console.log("takePhoto", takePhoto)
        // First, request permission to use the camera
        await requestPermission();
        
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
            console.log("image uri", result.assets[0].uri)
          setImage(result.assets[0].uri);
        }
    };

    handleChangeData = (value, propertyName) => {
      if(propertyName == "phoneNumber") { setPhoneNumber(value) }

      else if(clientName == "name") { setClientName(value) }
    }

    const createClient = async () => {
        console.log("createSale", sale)
        try {
        const response = await axios.post('http://192.168.100.4:3000/sales/createSale', sale);
        console.log('Sale created successfully:', response.data);
        router.back()
        } catch (error) {
        console.log('Error:', error.message);
        }
    };

  return (
    <SafeAreaView>
    <View className="h-full w-full">
      <Text className='text-center font-bold'>Crear Cliente</Text>
      <View className="w-full h-[150px] bottom-0 right-0 left-0 bg-primary p-2">
        <View className='flex-row justify-between pb-4'>
          <View className="w-full justify-center min-h-[83vh] px-4 my-6">
            <FormField title="Nombre de Cliente" handleChangeText={(e) => this.handleChangeData(e, "name")} otherStyles="mt-7" keyboardType="email-address"/>
            <FormField title="Numero de Celular" placeholder="Numero de celular" keyboardType="numeric" otherStyles="mt-7" handleChangeText={(value) => this.handleChangeData(value, "phoneNumber")}/>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            <View className='h-[60px] mt-7'><CustomButton title="Sacar foto de casa" handlePress={takePhoto} /></View>
            <View className='h-[60px] mt-7'><CustomButton title="Crear Cliente" handlePress={createClient}/></View>
          </View>
        </View>
      </View>
    </View>
    </SafeAreaView>
  );
};

export default CreateClient;
