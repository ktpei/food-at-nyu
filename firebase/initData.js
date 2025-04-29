// initData.js
// mock data to populate the database
import { addDiningHall, addDiscountPlace } from './services';

export const initializeDiningHallsData = async () => {
  const diningHalls = [
    {
      name: 'Palladium Dining Hall',
      location: {
        latitude: 40.7312,
        longitude: -73.9902,
      },
      hours: '7:00 AM - 10:00 PM',
      crowdedness: 'Medium',
      type: 'dining_hall',
      menu: [
        {
          name: 'Classic Burger',
          price: 8.99,
          category: 'lunch',
          description: 'Beef patty with lettuce, tomato, and cheese'
        },
        {
          name: 'Vegetarian Pasta',
          price: 7.99,
          category: 'dinner',
          description: 'Pasta with seasonal vegetables and marinara sauce'
        }
      ]
    },
    {
      name: 'Third North Dining Hall',
      location: {
        latitude: 40.7294,
        longitude: -73.9874,
      },
      hours: '8:00 AM - 9:00 PM',
      crowdedness: 'High',
      type: 'dining_hall',
      menu: [
        {
          name: 'Breakfast Burrito',
          price: 6.99,
          category: 'breakfast',
          description: 'Eggs, cheese, and vegetables wrapped in a tortilla'
        },
        {
          name: 'Chicken Tenders',
          price: 8.49,
          category: 'lunch',
          description: 'Crispy chicken tenders with fries'
        }
      ]
    }
  ];

  for (const hall of diningHalls) {
    await addDiningHall(hall);
  }
};

export const initializeDiscountPlacesData = async () => {
  const discountPlaces = [
    {
      name: 'Starbucks @ Kimmel',
      location: {
        latitude: 40.7295,
        longitude: -73.9972,
      },
      hours: '7:00 AM - 9:00 PM',
      discount: '10% off with NYU ID',
      type: 'discount'
    },
    {
      name: 'Chipotle @ Astor Place',
      location: {
        latitude: 40.7297,
        longitude: -73.9911,
      },
      hours: '10:30 AM - 10:00 PM',
      discount: '15% off with NYU ID',
      type: 'discount'
    }
  ];

  for (const place of discountPlaces) {
    await addDiscountPlace(place);
  }
};