// app/explore/index.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { searchDiningHallsByTerm } from '../firebase/services';  // or getDiningHalls if you didn’t add the helper
import ListingItem from '../components/ListItem';               // :contentReference[oaicite:2]{index=2}&#8203;:contentReference[oaicite:3]{index=3}

export default function ExploreScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const halls = await searchDiningHallsByTerm(query);
    setResults(halls);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="What are you craving?"
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.button}>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Loading state */}
      {loading && <ActivityIndicator style={styles.loading} size="large" />}

      {/* No results */}
      {!loading && query.length > 0 && results.length === 0 && (
        <Text style={styles.noResults}>
          No dining halls found for “{query}.”
        </Text>
      )}

      {/* Results list */}
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListingItem
            item={item}
            onVote={() => { /* optionally handle up/down here */ }}
          />
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#f8f8f8' },
  searchRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
    marginTop: 60,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  button: {
    marginLeft: 8,
    backgroundColor: '#57068c',
    padding: 8,
    borderRadius: 8
  },
  loading: { marginTop: 24 },
  noResults: {
    textAlign: 'center',
    marginTop: 24,
    color: '#555',
    fontSize: 16
  }
});
