import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import DiningMap from '../components/DiningMap';

export default function MapScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"}/>
      <DiningMap />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});