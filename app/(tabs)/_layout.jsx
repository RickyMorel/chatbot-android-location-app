import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import Colors from '../colors';

const TabIcon = ({icon, color, name ,focused}) => {
    return (
        <View className="items-center justify-center gap-2">
            {/* <Image source={icon} resizeMode="contain" tintColor={color} className="w-6 h-6"/> */}
            <MaterialIcons name={icon} size={24} color={color} className="w-6 h-6"/> 
            <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color: color}}>
                {name}
            </Text>
        </View>
    )
}

const TabsLayout = () => {
  return (
      <Tabs screenOptions={tabStyle}>
        <Tabs.Screen name="map" options={{title: 'Mapa', headerShown: false, tabBarIcon: ({color, focused}) => (
            <TabIcon icon="map" color={color} name="Mapa" focused={focused}/>
        )}}/>
        <Tabs.Screen name="sales" options={{title: 'Ventas', headerShown: false, tabBarIcon: ({color, focused}) => (
            <TabIcon icon="payment" color={color} name="Ventas" focused={focused}/>
        )}}/>
        <Tabs.Screen name="stock" options={{title: 'Stock', headerShown: false, tabBarIcon: ({color, focused}) => (
            <TabIcon icon="local-shipping" color={color} name="Stock" focused={focused}/>
        )}}/>
      </Tabs>
  )
}

const tabStyle = {
    tabBarShowLabel: false,
    tabBarActiveTintColor: Colors.Secondary,
    tabBarInactiveTintColor: '#CDCDE0',
    tabBarStyle: {
        backgroundColor: '#161622',
        borderTopWidth: 1,
        borderTopColor: '#232533',
        height: 84
    }
}

export default TabsLayout