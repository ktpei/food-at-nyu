// app/dining/[id].js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  getDiningHall,
  upvoteDiningHall,
  downvoteDiningHall,
  getDiscountPlace,
  upvoteDiscountPlace,
  downvoteDiscountPlace,

  getDiningMenu,
} from '../../firebase/services';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';

export default function DetailsScreen() {
  const { id, type } = useLocalSearchParams();
  const [item, setItem] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        // fetch the “header” data
        let data = type === 'discount_place'
          ? await getDiscountPlace(id)
          : await getDiningHall(id);
        setItem(data);

        // fetch just the menu (for dining halls)
        if (type === 'dining_hall') {
          const menuItems = await getDiningMenu(id);
          setMenu(menuItems);
        }
      } catch (e) {
        console.error('Error fetching item or menu:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, type]);

  const handleVote = async (voteType) => {
    // … same voting logic …
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      </View>
    );
  }
  if (!item) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Item not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color={COLORS.PRIMARY} />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* Header Info */}
      <Text style={styles.title}>{item.name}</Text>
      {item.hours && <Text style={styles.text}>Hours: {item.hours}</Text>}
      {type === 'dining_hall' && item.crowdedness != null && (
        <Text style={styles.text}>Crowdedness: {item.crowdedness}</Text>
      )}
      {type === 'discount_place' && item.discount != null && (
        <Text style={styles.text}>Discount: {item.discount}%</Text>
      )}

      {/* Menu (only for dining halls) */}
      {type === 'dining_hall' && (
        <>
          <Text style={styles.menuHeader}>Menu</Text>
          <FlatList
            data={menu}
            keyExtractor={(m, i) => `${m.name}-${i}`}
            style={styles.menuList}
            renderItem={({ item }) => (
              <Text style={styles.menuItem}>{item.name}</Text>
            )}
          />
        </>
      )}

      {/* Voting */}
      <View style={styles.votes}>
        <TouchableOpacity onPress={() => handleVote('up')}>
          <Ionicons name="chevron-up" size={32} color={COLORS.PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.score}>
          {(item.upvotes || 0) - (item.downvotes || 0)}
        </Text>
        <TouchableOpacity onPress={() => handleVote('down')}>
          <Ionicons name="chevron-down" size={32} color={COLORS.ERROR} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  notFound: { fontSize: 16, color: '#555' },
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, marginTop: 40 },
  backText: { marginLeft: 4, fontSize: 16, color: COLORS.PRIMARY },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 12, color: COLORS.PRIMARY },
  text: { fontSize: 16, marginBottom: 8 },
  menuHeader: { fontSize: 20, fontWeight: '600', marginTop: 16, marginBottom: 8 },
  menuList: { maxHeight: 200 },            // adjust height as needed
  menuItem: { fontSize: 16, paddingVertical: 4 },
  votes: { flexDirection: 'row', alignItems: 'center', marginTop: 24, justifyContent: 'center' },
  score: { fontSize: 20, marginHorizontal: 16, fontWeight: '600' },
});
