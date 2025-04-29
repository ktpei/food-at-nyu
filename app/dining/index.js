import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getDiningHalls, getDiscountPlaces, upvoteDiningHall, downvoteDiningHall, upvoteDiscountPlace, downvoteDiscountPlace } from '../../firebase/services';
import { COLORS } from '../../constants/theme'
import { FilterContext } from '../_layout';
import ListingItem from '../../components/ListItem';


export default function DiningScreen() {
  const router = useRouter();
  const { selected } = useContext(FilterContext); // 'dining', 'discounts', or 'all'
  const [diningHalls, setDiningHalls] = useState([]);
  const [discountPlaces, setDiscountPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load data from Firebase
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const halls = await getDiningHalls();
        const places = await getDiscountPlaces();
        setDiningHalls(halls);
        setDiscountPlaces(places);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter data based on the selected tab
  const getFilteredData = () => {
    
    if (selected === 'dining') return diningHalls;
    if (selected === 'discounts') return discountPlaces;
    return [...diningHalls, ...discountPlaces]; // Combine both for 'all'
  };
  // Handle voting
  const handleVote = async (item, voteType) => {
    try {
      let success = false;
      
      if (item.type === 'dining_hall') {
        if (voteType === 'up') {
          success = await upvoteDiningHall(item.id);
        } else {
          success = await downvoteDiningHall(item.id);
        }
        
        if (success) {
          // Update local state to reflect the vote
          setDiningHalls(prev => 
            prev.map(hall => 
              hall.id === item.id 
                ? { 
                    ...hall, 
                    upvotes: voteType === 'up' ? (hall.upvotes + 1) : hall.upvotes,
                    downvotes: voteType === 'down' ? (hall.downvotes + 1) : hall.downvotes 
                  } 
                : hall
            )
          );
        }
      } else {
        if (voteType === 'up') {
          success = await upvoteDiscountPlace(item.id);
        } else {
          success = await downvoteDiscountPlace(item.id);
        }
        
        if (success) {
          // Update local state to reflect the vote
          setDiscountPlaces(prev => 
            prev.map(place => 
              place.id === item.id 
                ? { 
                    ...place, 
                    upvotes: voteType === 'up' ? (place.upvotes + 1) : place.upvotes,
                    downvotes: voteType === 'down' ? (place.downvotes + 1) : place.downvotes 
                  } 
                : place
            )
          );
        }
      }
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const renderItem = ({ item }) => (
    <ListingItem
      item = { item }
      onVote = { handleVote }
    />
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
        <Text style={styles.loadingText}>Loading dining data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Switch Component */}
  
        
    

      {/* Display Data */}
      <FlatList
        data={getFilteredData()}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No places found.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  switchText: {
    fontSize: 16,
    color: '#888',
    padding: 10,
  },
  activeTab: {
    color: '#57068c',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDetails: {
    fontSize: 14,
    color: '#555',
  },
});