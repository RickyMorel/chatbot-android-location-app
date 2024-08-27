import axios from 'axios';
import React, { Component } from 'react';
import { Image, Linking, StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { icons } from '../constants';

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

  componentDidUpdate(prevProps) {
    if(prevProps == this.props) {return;}

    this.fetchRoute()
    this.fitToMarkers()
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
    const { orderLocations, userLocation, storeLocation } = this.props;

    console.log("storeLocation", storeLocation)
  
    if (userLocation && orderLocations.length > 0) {
      const waypoints = orderLocations.map(location => `via:${location.locationDto.location.lat},${location.locationDto.location.lng}`).join('|');
      const destination = storeLocation;
      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${destination.locationDto.location.lat},${destination.locationDto.location.lng}&waypoints=${waypoints}&travelmode=driving`;
      Linking.openURL(url);
    }
  };

// Add this method to your component
fetchRoute = async () => {
  console.log("fetchRoute")

  const { orderLocations, userLocation, storeLocation } = this.props;

  console.log("orderLocations", orderLocations)
  console.log("userLocation", userLocation)
  console.log("storeLocation", storeLocation)

  if (userLocation && orderLocations.length > 0) {
    console.log("if (userLocation && orderLocations.length > 0")
    const waypoints = orderLocations.map(location => `via:${location.locationDto.location.lat},${location.locationDto.location.lng}`).join('|');
    console.log("waypoints", waypoints)
    const destination = storeLocation;
    console.log("destination", destination)
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${userLocation.latitude},${userLocation.longitude}&destination=${destination.location.lat},${destination.location.lng}&waypoints=${waypoints}&key=${GOOGLE_MAPS_APIKEY}`;
    console.log("fetchRoute url", url)


    try {
      const response = await axios.get(url);
      console.log("fetchRoute response", response)
      const points = response.data.routes[0].overview_polyline.points;
      const decodedPoints = this.decodePolyline(points);

      this.setState({ routeCoordinates: decodedPoints });
    } catch (error) {
      console.error(error);
    }
  }
};

// Decode polyline
decodePolyline = (t) => {
  const coordinates = [];
  let index = 0, lat = 0, lng = 0;

  while (index < t.length) {
    let b, shift = 0, result = 0;
    do {
      b = t.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = t.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lng += dlng;

    coordinates.push({
      latitude: (lat / 1E5),
      longitude: (lng / 1E5)
    });
  }
  return coordinates;
};

// In your render method, add a Polyline
render() {
  const { routeCoordinates } = this.state;
  const { orderLocations, storeLocation } = this.props;

  const allMarkers = orderLocations.map(x => (
    <Marker
      key={x.id}
      coordinate={{ latitude: x.locationDto?.location?.lat, longitude: x.locationDto?.location?.lng }}
      title={x.name}
      description={`${Intl.NumberFormat('de-DE').format(x.totalSold)}gs`}
    />
  ));

  return (
      <View style={styles.container} className="items-center justify-center">
        <MapView
          ref={this.mapRef}
          style={styles.map}
          initialRegion={this.state?.userLocation}
          showsUserLocation={true}
        >
          {allMarkers}

          <Marker
            key={"Store"}
            coordinate={{ latitude: storeLocation?.location?.lat, longitude: storeLocation?.location?.lng }}
            title={"Tienda"}
            description={`Tu local`}
          >
            <View style={{ width: 30, height: 30 }}>
              <Image
                source={icons.storeMapIcon}
                style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
              />
            </View>
          </Marker>

          {routeCoordinates && (
            <Polyline
              coordinates={routeCoordinates}
              strokeWidth={3}
              strokeColor="hotpink"
            />
          )}
        </MapView>
      

        {/* <SafeAreaView>
          <Button title="Open in Google Maps" className='w-[100px] h-[200px] absolute' onPress={this.openGoogleMaps} />
        </SafeAreaView> */}
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
