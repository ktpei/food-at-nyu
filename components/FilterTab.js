// components/FilterTab.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const TABS = [
  { key: 'dining',   label: 'Dining Halls' },
  { key: 'discounts', label: 'Discounts'  },
  { key: 'all',      label: 'All'        },
];

export default function FilterTab({ selectedTab, onSelect }) {
  return (
    <View style={styles.container}>
      {TABS.map((tab, i) => (
        <TouchableOpacity
          key={tab.key}
          onPress={() => onSelect(tab.key)}
          style={[
            styles.segment,
            i > 0 && styles.segmentBorder,
            selectedTab === tab.key && styles.activeSegment,
          ]}
        >
          <Text
            style={[
              styles.label,
              selectedTab === tab.key && styles.activeLabel,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#eee',
    borderRadius: 8,
    overflow: 'hidden',
    margin: 16,
  },
  segment: {
    flex: 1,
    paddingVertical: 6,
    backgroundColor: 'transparent',
  },
  segmentBorder: {
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
  },
  activeSegment: {
    backgroundColor: '#fff',
  },
  label: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
  activeLabel: {
    color: '#000',
    fontWeight: '600',
  },
});
