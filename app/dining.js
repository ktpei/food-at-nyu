import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// Sample data
const DINING_HALLS = [
  { id: 'palladium', name: 'Palladium Dining Hall', hours: '7:00 AM - 10:00 PM' },
  { id: 'third north', name: 'Third North Dining Hall', hours: '8:00 AM - 9:00 PM' },
];

const DISCOUNT_PLACES = [
  { id: 'starbucks@k', name: 'Starbucks @ Kimmel', discount: '10% off with NYU ID' },
  { id: 'chipotle@a', name: 'Chipotle @ Astor Place', discount: '15% off with NYU ID' },
];

export default function DiningScreen() {
  const [selectedTab, setSelectedTab] = useState('all'); // 'dining', 'discounts', or 'all'

  // Filter data based on the selected tab
  const getFilteredData = () => {
    if (selectedTab === 'dining') return DINING_HALLS;
    if (selectedTab === 'discounts') return DISCOUNT_PLACES;
    return [...DINING_HALLS, ...DISCOUNT_PLACES]; // Combine both for 'all'
  };

  return (
    <View style={styles.container}>
      {/* Switch Component */}
      <View style={styles.switchContainer}>
        <Text
          style={[
            styles.switchText,
            selectedTab === 'dining' && styles.activeTab,
          ]}
          onPress={() => setSelectedTab('dining')}
        >
          Dining Halls
        </Text>
        <Text
          style={[
            styles.switchText,
            selectedTab === 'discounts' && styles.activeTab,
          ]}
          onPress={() => setSelectedTab('discounts')}
        >
          Discounts
        </Text>
        <Text
          style={[
            styles.switchText,
            selectedTab === 'all' && styles.activeTab,
          ]}
          onPress={() => setSelectedTab('all')}
        >
          All
        </Text>
      </View>

      {/* Display Data */}
      <FlatList
        data={getFilteredData()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDetails}>
              {item.hours || item.discount}
            </Text>
          </View>
        )}
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