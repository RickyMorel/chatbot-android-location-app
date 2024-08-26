import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

class MapComponent extends Component {
  render() {
    const asuncionPos = {lat: -25.291247, lng: -57.594025}
    const {orderLocations, userLocation} = this.props
    const allMarkers = orderLocations.map(x => {
      return ( 
        <Marker
          key={x.id}
          coordinate={{ latitude: x.locationDto?.location?.lat, longitude: x.locationDto?.location?.lng}}
          title={x.name}
          description={`${Intl.NumberFormat('de-DE').format(x.totalSold)}gs`}
        />
      );
    });

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={userLocation}
          region={userLocation}
          userLocation={userLocation}
          showsUserLocation={true}
        >
          {allMarkers}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapComponent;
