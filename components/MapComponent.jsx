import React, { Component } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

class MapComponent extends Component {
  constructor() {
    super()

    this.state = {
      coordinates: undefined
    }
  }

  componentDidUpdate(prevProps) {
    // Check if orderLocations or userLocation have changed
    if (this.props.orderLocations !== prevProps.orderLocations || this.props.userLocation !== prevProps.userLocation) {
      if (this.props?.orderLocations.length > 0) {
        this.getDirections(this.props?.userLocation, this.props?.orderLocations[0].locationDto?.location);
      }
    }
  }

  getDirections = async (origin, destination) => {
    const apiKey = 'AIzaSyAABDFNQWqSoqDeJBIAUCHfxInlTDtRp6A';
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination?.lat},${destination?.lng}&key=${apiKey}`;

    const response = await fetch(url);   
    const json = await response.json();

    console.log("json.routes", json.routes[0].overview_polyline.points)

    if (json.routes.length > 0) {
      console.log("json.routes.length > 0", json.routes.length > 0)
      const points = this.decodePolyline(json.routes[0].overview_polyline.points);
      this.setState({ coordinates: points });
    }
  };

  decodePolyline = (encoded) => {
    let points = [];
    let index = 0, len = encoded.length;
    let lat = 0, lng = 0;

    while (index < len) {
      let b, shift = 0, result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = (result & 1) ? ~(result >> 1) : (result >> 1);
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = (result & 1) ? ~(result >> 1) : (result >> 1);
      lng += dlng;

      points.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      });
    }

    return points;
  };

  render() {
    const {orderLocations, userLocation} = this.props

    console.log("coordinates", this.state?.coordinates)

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
          {this.state.coordinates && (
            <Polyline
              coordinates={this.state.coordinates}
              strokeWidth={4}
              strokeColor="blue"
            />
          )}
          {/* {allMarkers} */}
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
