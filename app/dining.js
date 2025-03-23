import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DiningScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dining Halls Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#57068c',
  },
});