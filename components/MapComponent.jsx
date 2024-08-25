import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

class MapComponent extends Component {
  render() {
    const {orderLocations} = this.props
    const allMarkers = orderLocations.map(x => {
      console.log("x.locationDto?.location?", x.locationDto?.location);

      return ( // Return the JSX element
        <Marker
          key={x.id} // It's a good practice to add a unique key for each Marker
          coordinate={{ latitude: x.locationDto?.location?.lat ?? 37.78825, longitude: x.locationDto?.location?.lng ?? -122.4324 }}
          title={x.name}
          description={`${Intl.NumberFormat('de-DE').format(x.totalSold)}gs`}
        />
      );
    });

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: orderLocations[0]?.locationDto?.location?.lat ?? 37.78825, // Initial latitude
            longitude: orderLocations[0]?.locationDto?.location?.lng ?? -122.4324, // Initial longitude
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
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
