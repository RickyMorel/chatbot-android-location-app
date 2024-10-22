import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import Colors from '../app/colors';
import { useLoading } from '../app/LoadingProvider';

const Spinner = () => {
  const isLoading = useLoading(); // Get loading state from context

  console.log("Spinner Loading", isLoading);

  return (
    isLoading && (
      <View style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        zIndex: 999,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <ActivityIndicator animating={true} color={Colors.Secondary} size="large" />
        <Text style={{ color: 'gray', fontWeight: '600', fontSize: 16 }}>Cargando...</Text>
      </View>
    )
  );
};

export default Spinner;
