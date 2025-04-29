import React, { useState, createContext } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import FilterTab from '../components/FilterTab';
import 'react-native-url-polyfill/auto';

export const FilterContext = createContext({
  selected: 'all',
  setSelected: () => {},
});

const NYU_PURPLE = '#57068c';

export default function AppLayout() {
  const [selected, setSelected] = useState('all');

  return (
    <FilterContext.Provider value={{ selected, setSelected }}>
      <View style={{ flex: 1 }}>
        {/* Tab navigator */}
        <Tabs
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'index') {
                iconName = focused ? 'map' : 'map-outline';
              } else if (route.name === 'dining') {
                iconName = focused ? 'restaurant' : 'restaurant-outline';
              } else if (route.name === 'explore') {
                iconName = focused ? 'search' : 'search-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: NYU_PURPLE,
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tabs.Screen
            name="dining"
            options={{ title: 'Dining' }}
          />
          <Tabs.Screen
            name="index"
            options={{ title: 'Map' }}
          />
          <Tabs.Screen
            name="explore"
            options={{ title: 'Explore' }}
          />
        </Tabs>

        {/* Overlay FilterTab on top of all screens */}
        <View style={styles.overlay} pointerEvents="box-none">
          <FilterTab
            selectedTab={selected}
            onSelect={setSelected}
          />
        </View>
      </View>
    </FilterContext.Provider>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
  },
});
