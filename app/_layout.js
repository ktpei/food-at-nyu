import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const NYU_PURPLE = '#57068c';

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          // Use route.name to determine which icon to show
          if (route.name === 'index') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'dining') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'discounts') {
            iconName = focused ? 'pricetag' : 'pricetag-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: NYU_PURPLE,
        tabBarInactiveTintColor: 'gray',
      })}
    >
      
      <Tabs.Screen 
        name="dining" 
        options={{
          title: "Dining Halls"
        }}
      />
      <Tabs.Screen 
        name="index" 
        options={{
          title: "Map"
        }}
      />
      <Tabs.Screen 
        name="discounts" 
        options={{
          title: "Discounts"
        }}
      />
    </Tabs>
  );
}