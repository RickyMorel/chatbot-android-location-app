import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Image, Linking, StyleSheet, View, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { icons } from '../constants';
import CustomButton from './CustomButton';

const GOOGLE_MAPS_APIKEY = 'AIzaSyAABDFNQWqSoqDeJBIAUCHfxInlTDtRp6A';

const MapComponent = ({ userLocation, orderLocations, storeLocation }) => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [optimizedWaypoints, setOptimizedWaypoints] = useState([]);
  const [currentUserLocation, setCurrentUserLocation] = useState(userLocation);
  const [viewTodaysClientLocations, setViewTodaysClientLocations] = useState(false);
  const [todaysClientLocations, setTodaysClientLocations] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    setCurrentUserLocation(userLocation);
  }, [userLocation]);

  useEffect(() => {
    if (userLocation && orderLocations) {
      fitToMarkers();
      //fetchRoute()
    }
  }, [userLocation, orderLocations]);

  useEffect(() => {
    if(viewTodaysClientLocations == false) {return;}

    fetchAllTodaysClientsLocations();
  }, [viewTodaysClientLocations])

  const fetchAllTodaysClientsLocations = async () => {
    try {
      const url = `http://192.168.100.4:3000/client-location/getAllTodaysClientLocations`;
      const response = await axios.get(url);
      console.log("fetchAllTodaysClientsLocations", response)
      setTodaysClientLocations(response.data);
    } catch (error) {
      console.log('Error:', error.message);
    }
  }

  const fitToMarkers = () => {
    const allCoordinates = orderLocations.map(x => ({
      latitude: x.locationDto?.location?.lat,
      longitude: x.locationDto?.location?.lng,
    }));

    if (mapRef.current && allCoordinates.length > 0) {
      mapRef.current.fitToCoordinates([userLocation, ...allCoordinates], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  };

  const openGoogleMaps = async () => {
    if (userLocation && orderLocations.length > 0 && storeLocation) {
      try {
        const waypoints = optimizedWaypoints
          .map(location => `${location.locationDto.location.lat},${location.locationDto.location.lng}`)
          .join('|');
        const destination = storeLocation;
        const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(userLocation.latitude)},${encodeURIComponent(userLocation.longitude)}&destination=${encodeURIComponent(destination.location.lat)},${encodeURIComponent(destination.location.lng)}&waypoints=${encodeURIComponent(waypoints)}&travelmode=driving`;

        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          Alert.alert("Error", "Unable to open Google Maps");
        }
      } catch (error) {
        Alert.alert("Error", "An error occurred while opening Google Maps");
        console.error("Error opening Google Maps:", error);
      }
    } else {
      Alert.alert("Error", "Missing location data");
    }
  };

  const fetchRoute = async () => {
    if (userLocation && orderLocations.length > 0) {
      const waypoints = `optimize:true|${orderLocations.map(location => `${location.locationDto.location.lat},${location.locationDto.location.lng}`).join('|')}`;
      const destination = storeLocation;

      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${userLocation.latitude},${userLocation.longitude}&destination=${destination.location.lat},${destination.location.lng}&waypoints=${waypoints}&key=${GOOGLE_MAPS_APIKEY}`;

      try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
          const points = response.data.routes[0].overview_polyline.points;
          const decodedPoints = decodePolyline(points);

          const optimizedOrder = response.data.routes[0].waypoint_order;
          const optimizedWaypoints = optimizedOrder.map(index => orderLocations[index]);

          setRouteCoordinates(decodedPoints);
          setOptimizedWaypoints(optimizedWaypoints);
        } else {
          console.error("Error in response:", response.data.status);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const decodePolyline = (t) => {
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

  const allMarkers = orderLocations.map((x) => (
    <Marker
      key={x.locationDto.phoneNumber}
      coordinate={{ latitude: x.locationDto?.location?.lat, longitude: x.locationDto?.location?.lng }}
      title={x.name}
      description={`${Intl.NumberFormat('de-DE').format(x.totalSold)}gs`}
    />
  ));

  const allClientLocationMarkers = todaysClientLocations.map((x) => (
    <Marker
      key={x.phoneNumber}
      coordinate={{ latitude: x?.location?.lat, longitude: x?.location?.lng }}
      title={x.name}
      pinColor='blue'
    />
  ));

  return (
    <View style={styles.container} className="items-center justify-center">
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={currentUserLocation}
        showsUserLocation={true}
      >
        {allMarkers}
        {allClientLocationMarkers}

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

      <View className="w-[150px] h-[40px] mt-6 mr-2 absolute bottom-[120px] right-0">
        <CustomButton title="Empezar Ruta" handlePress={openGoogleMaps}/>
      </View>
      <View className="w-[40px] h-[40px] mt-6 mr-2 absolute top-[25px] right-0">
        <CustomButton icon="person" handlePress={() => setViewTodaysClientLocations(!viewTodaysClientLocations)}/>
      </View>
    </View>
  );
};

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
