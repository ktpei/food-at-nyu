import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { getDiningHalls, getDiscountPlaces } from '../firebase/services';
import { useRouter } from 'expo-router';
import { FilterContext } from '../app/_layout';

// NYU Washington Square coordinates
const NYU_REGION = {
  latitude: 40.7295,
  longitude: -73.9965,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const DiningMap = () => {
  const [location, setLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState(NYU_REGION);
  const [diningHalls, setDiningHalls] = useState([]);
  const [discountPlaces, setDiscountPlaces] = useState([]);
  const { selected } = useContext(FilterContext);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);
  const router = useRouter();

  // Load data from Firebase
  useEffect(() => {
  const loadData = async () => {
      try {
      setLoading(true);
      const halls = await getDiningHalls();
      const places = await getDiscountPlaces();
      setDiningHalls(halls);
      setDiscountPlaces(places);
      console.log('received firebase data', halls[0].location.latitude);
      } catch (error) {
      console.error('Error loading data:', error);
      } finally {
      setLoading(false);
      }
  };
  loadData();
  }, []);

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

  // Function to reset map to NYU region
  const resetToNYU = () => {
    console.log('Resetting map to NYU');
    if (mapRef.current) {
      mapRef.current.animateToRegion(NYU_REGION, 500); // half-second smooth animation
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={mapRegion}
      >
        {/* show dining halls if filter is 'dining' or 'all' */}
        {(selected === 'dining' || selected === 'all') &&
          diningHalls.map(hall => (
            <Marker
            key={hall.id}
            coordinate={{
              latitude: hall.location.latitude,
              longitude: hall.location.longitude,
            }}
            onCalloutPress={() =>
              router.push({
                pathname: '/dining/[id]',
                params: { id: hall.id, type: 'dining_hall' },
              })
            }
          >
            <Callout>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>{hall.name}</Text>
                <Text style={styles.calloutText}>Hours: {hall.hours}</Text>
              </View>
            </Callout>
          </Marker>
          ))
        }
        
        {(selected === 'discounts' || selected === 'all') &&
          discountPlaces.map(place => (
            <Marker
            key={place.id}
            coordinate={{
              latitude: place.location.latitude,
              longitude: place.location.longitude,
            }}
            pinColor="green"
            onCalloutPress={() =>
              router.push({
                pathname: '/dining/[id]',
                params: { id: place.id, type: 'discount_place' },
              })
            }
          >
            <Callout>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>{place.name}</Text>
                <Text style={styles.calloutText}>Hours: {place.hours} Discount: {place.discount}%</Text>
              </View>
            </Callout>
          </Marker>
          ))
        }

      
      </MapView>
      
      {/* Home button */}
      <TouchableOpacity 
        style={styles.homeButton}
        onPress={resetToNYU}
      >
        <Ionicons name="home" size={24} color="#57068c" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  calloutContainer: { width: 180, padding: 4 },
  calloutTitle: { fontSize: 16, marginBottom: 4 },
  calloutText: { fontSize: 12, marginBottom: 2 },
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  homeButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default DiningMap;