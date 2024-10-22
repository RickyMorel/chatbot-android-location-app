import React, { Component, useContext } from 'react'
import Colors from '../app/colors'
import { ActivityIndicator, Text, View } from 'react-native'
import Utils from '../app/Utils'
import globalVars from '../app/globalVars'

class Spinner extends Component {
  render() {
    console.log("Spinner Loading", globalVars.getIsLoading())
    return (  
        globalVars.getIsLoading() && 
        <View style={{position: 'absolute', width: '100%', height:'100%', backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: 999, alignItems: 'center',  justifyContent: 'center'}}>
            <ActivityIndicator animating={true} color={Colors.Secondary} size="large"/>
            <Text className="text-gray-100 font-psemibold text-base" >Cargando...</Text>
       </View>
    )
  }
}

export default Spinner