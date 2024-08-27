import React, { Component } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { StyleSheet, View, Button, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const GOOGLE_MAPS_APIKEY = 'AIzaSyAABDFNQWqSoqDeJBIAUCHfxInlTDtRp6A';

class MapComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userLocation: undefined
    }
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    this.setState({
      userLocation: this.props.userLocation
    })
  }

  fitToMarkers = () => {
    const { orderLocations, userLocation } = this.props;
    const allCoordinates = orderLocations.map(x => ({
      latitude: x.locationDto?.location?.lat,
      longitude: x.locationDto?.location?.lng,
    }));

    if (this.mapRef.current && allCoordinates.length > 0) {
      this.mapRef.current.fitToCoordinates([userLocation, ...allCoordinates], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  };

  openGoogleMaps = () => {
    const { userLocation } = this.state;
    const { orderLocations } = this.props;

    if (userLocation && orderLocations.length > 0) {
      const destination = orderLocations[0];
      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${destination.locationDto.location.lat},${destination.locationDto.location.lng}&travelmode=driving`;
      Linking.openURL(url);
    }
  };

  render() {
    const { orderLocations } = this.props;

    const allMarkers = orderLocations.map(x => (
      <Marker
        key={x.id}
        coordinate={{ latitude: x.locationDto?.location?.lat, longitude: x.locationDto?.location?.lng }}
        title={x.name}
        description={`${Intl.NumberFormat('de-DE').format(x.totalSold)}gs`}
      />
    ));

    const destination = orderLocations.length > 0 
      ? {
          latitude: orderLocations[0].locationDto?.location?.lat,
          longitude: orderLocations[0].locationDto?.location?.lng,
        }
      : null;

    return (
      <View style={styles.container} className="items-center justify-center">
        {/* <MapView
          ref={this.mapRef}
          style={styles.map}
          initialRegion={this.state?.userLocation}
          showsUserLocation={true}
        >
          {allMarkers}

          {destination && (
            <MapViewDirections
              origin={this.state?.userLocation}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="hotpink"
              mode="DRIVING"
            />
          )}
        </MapView> */}
        <SafeAreaView>
          <Button title="Open in Google Maps" className='w-[100px] h-[200px] absolute' onPress={this.openGoogleMaps} />
        </SafeAreaView>
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
