import React, { Component } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router';

class SignIn extends Component {
  constructor() {
    super()
    this.state = {
      form: {
        email: '',
        password: ''
      },
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

  handleSubmit = () => {

  }

  render() {
    return (
      <SafeAreaView className="bg-primary h-full">
        <ScrollView>
          <View className="w-full justify-center min-h-[83vh] px-4 my-6">
            <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]" />
            <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Log in to Aora</Text>
            <FormField title="Email" value={this.state.form.email} handleChangeText={(e) => this.handleFormChange(e, "email")} otherStyles="mt-7" keyboardType="email-address"/>
            <FormField title="Password" value={this.state.form.password} handleChangeText={(e) => this.handleFormChange(e, "password")} otherStyles="mt-7"/>
            <CustomButton title="Sign In" handlePress={this.handleSubmit} containerStyles="mt-7" isLoading={this.state.isLoading}/>
            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">Don't have an account</Text>
              <Link href="/sign-up" className='text-lg font-psemibold text-secondary'>Sign Up</Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default SignIn;
