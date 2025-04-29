import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS } from '../constants/theme';

export default function ListingItem({ item, onVote }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => router.push({
        pathname: '/dining/[id]',
        params: { id: item.id, type: item.type },
      })}
    >
      <View style={styles.info}>
        <Text style={styles.title}>{item.name}</Text>
        {item.hours ? (
          <Text style={styles.subtitle}>{item.hours}</Text>
        ) : item.discount ? (
          <Text style={styles.subtitle}>{item.discount}% off</Text>
        ) : null}
      </View>

      <View style={styles.votes}>
        <TouchableOpacity onPress={() => onVote(item, 'up')}>
          <Ionicons name="chevron-up" size={24} color={COLORS.PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.score}>
          {(item.upvotes || 0) - (item.downvotes || 0)}
        </Text>
        <TouchableOpacity onPress={() => onVote(item, 'down')}>
          <Ionicons name="chevron-down" size={24} color={COLORS.ERROR} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 16,
    marginHorizontal: 12,
    marginVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 8,
    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    // Android shadow
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  info: {
    flex: 1,
    paddingRight: 12
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4
  },
  subtitle: {
    fontSize: 14,
    color: '#555'
  },
  votes: {
    alignItems: 'center',
    width: 36
  },
  score: {
    marginVertical: 4,
    fontSize: 16,
    fontWeight: '500'
  }
});
