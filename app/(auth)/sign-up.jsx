import axios from 'axios';
import { Link, router } from 'expo-router';
import React, { Component } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';

class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      form: {
        username: '',
        email: '',
        password: ''
      },
      isLoading: false,
      errors: [],
    }
  }

  hasErrors = () => {
    const { email, password, username } = this.state.form

    let errors = []

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(username.length < 3) { errors.push("username") }
    if(emailRegex.test(email) == false) { errors.push("email_2") }
    if(password.length < 1) { errors.push("password") }

    this.setState({errors: errors})

    if(errors.length > 0) {return true;}

    return false
  }

  getErrorMessages = () => {
    let errorMessages = ""

    if(this.state.errors.includes("username")) { errorMessages += "*Nombre de usuario tiene que tener mas de 3 caracteres\n"}
    if(this.state.errors.includes("email")) {errorMessages += "*Ya existe una cuenta con este correo\n"}
    if(this.state.errors.includes("email_2")) {errorMessages += "*Correo con formato invalido\n"}
    if(this.state.errors.includes("password")) { errorMessages += "*Contraseña muy corta\n"}

    return errorMessages.trimEnd("\n")
  }

  handleFormChange = (e, fieldName) => {
    let newForm = this.state.form
    newForm[fieldName] = e

    this.setState({
      form: newForm
    })
  }

  createAccount = async () => {
    const {username, email, password} = this.state.form

    console.log("createAccount")

    if(this.hasErrors() == true) {return;}

    try {
      const response = await axios.post('http://192.168.100.4:3000/auth/signup', {name: username, email: email, password: password});
      console.log('account created successfully:', response.data);

      // globalVars.setUser(response.data)
      router.push('/map')
    } catch (error) {
      console.log("aaaaaaaaa", error.response.data.message)
      this.setState({
        errors: [error.response.data.message]
      })
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
          <Text className=" text-sm text-red-600 font-pregular">{this.getErrorMessages()}</Text>
          <FormField title="Nombre" hasError={errors.includes("username")} placeholder='Juan Pancho' value={this.state.form.username} handleChangeText={(e) => this.handleFormChange(e, "username")} otherStyles="mt-3"/>
          <FormField title="Correo" hasError={errors.includes("email") || errors.includes("email_2")} placeholder="juan@gmail.com" value={this.state.form.email} handleChangeText={(e) => this.handleFormChange(e, "email")} otherStyles="mt-3" keyboardType="email-address"/>
          <FormField title="Contraseña" hasError={errors.includes("password")} placeholder='megustapan17' value={this.state.form.password} handleChangeText={(e) => this.handleFormChange(e, "password")} otherStyles="mt-3"/>
          <View className='h-[40px] w-full mb-8'>
            <CustomButton title="Crear Cuenta" handlePress={this.createAccount} containerStyles="mt-7" isLoading={this.state.isLoading}/>
          </View>
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Ya tenes una cuenta?</Text>
            <Link href="/sign-in" className='text-lg font-psemibold text-secondary'>Iniciar Sesión</Link>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default SignUp;
