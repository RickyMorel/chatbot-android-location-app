import axios from 'axios';
import { Link, router } from 'expo-router';
import React, { Component } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';

class SignIn extends Component {
  constructor() {
    super()
    this.state = {
      form: {
        email: '',
        password: ''
      },
      errors: [],
      isLoading: false
    }
  }

  handleFormChange = (e, fieldName) => {
    let newForm = this.state.form
    newForm[fieldName] = e

    this.setState({
      form: newForm
    })
  }

  hasErrors = () => {
    const { email, password } = this.state.form

    let errors = []

    if(email.length < 1) { errors.push("email") }
    if(password.length < 1) { errors.push("password") }

    this.setState({errors: errors})

    if(errors.length > 0) {return true;}

    return false
  }

  signIn = async () => {
    const { email, password } = this.state.form

    if(this.hasErrors() == true) {return;}

    try {
      const response = await axios.post('http://192.168.100.4:3000/auth/signin', {email: email, password: password});
      console.log('signed in successfully:', response.data);
      router.push('/map')
    } catch (error) {
      console.log('a:', error);
    }
  };
  
  render() {
    const {errors} = this.state

    return (
      <SafeAreaView className="bg-primary h-full">
        <ScrollView className='pl-8 pr-8'>
          <View style={{ width: 250, height: 250, borderRadius: 20, overflow: 'hidden', display: 'flex', alignSelf: 'center' }}>
            <Image 
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbQLGnT0RH-Rh0_5NefuPRVbUAXU0CxPfpDw&s' }}  
              resizeMode="contain" 
              style={{ width: '100%', height: '100%' }} 
            />
          </View>
          <View className='border-b-4 border-gray-300 mt-4 mb-4'></View>
          <FormField hasError={errors.includes("email")} placeholder="Ingrese tu correo..." title="Correo" value={this.state.form.email} handleChangeText={(e) => this.handleFormChange(e, "email")} otherStyles="mt-3" keyboardType="email-address"/>
          <FormField hasError={errors.includes("password")} title="Contraseña" placeholder='Ingrese tu contraseña...' value={this.state.form.password} handleChangeText={(e) => this.handleFormChange(e, "password")} otherStyles="mt-3"/>            
          <View className='h-[40px] w-full mb-8'>
            <CustomButton title="Iniciar Sesión" handlePress={this.signIn} containerStyles="mt-7" isLoading={this.state.isLoading}/>
          </View>
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">No tenes una cuenta?</Text>
            <Link href="/sign-up" className='text-lg font-psemibold text-secondary'>Crear Cuenta</Link>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default SignIn;
