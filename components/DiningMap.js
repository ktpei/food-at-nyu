import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

// NYU Washington Square coordinates
const NYU_REGION = {
  latitude: 40.7295,
  longitude: -73.9965,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

// Sample data - replace with your actual data
const DINING_HALLS = [
  {
    id: 'palladium',
    name: 'Palladium Dining Hall',
    location: {
      latitude: 40.7312,
      longitude: -73.9902,
    },
    hours: '7:00 AM - 10:00 PM',
    crowdedness: 'Medium',
    type: 'dining_hall',
  },
];

const DISCOUNT_PLACES = [
  {
    id: 'starbucks',
    name: 'Starbucks @ Kimmel',
    location: {
      latitude: 40.7295,
      longitude: -73.9972,
    },
    hours: '7:00 AM - 9:00 PM',
    discount: '10% off with NYU ID',
    type: 'discount',
  },
];

const DiningMap = () => {
  const [location, setLocation] = useState(null);

  // Get user's current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={NYU_REGION}
        region={location || NYU_REGION}
      >
        {/* Add markers for dining halls */}
        {DINING_HALLS.map((hall) => (
          <Marker
            key={hall.id}
            coordinate={hall.location}
            title={hall.name}
            description={`Hours: ${hall.hours}\nCrowdedness: ${hall.crowdedness}`}
          />
        ))}

        {/* Add markers for discount places */}
        {DISCOUNT_PLACES.map((place) => (
          <Marker
            key={place.id}
            coordinate={place.location}
            title={place.name}
            description={`Hours: ${place.hours}\nDiscount: ${place.discount}`}
            pinColor="green" // Different color for discount places
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default DiningMap;