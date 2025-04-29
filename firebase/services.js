import { 
    collection, 
    doc, 
    getDocs, 
    getDoc, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    query, 
    where, 
    increment 
  } from 'firebase/firestore';
  import db from './config';
  
  // Collection names
  const DINING_HALLS = 'dining halls';
  const DISCOUNT_PLACES = 'discounts';
  
  // Get all dining halls
  export const getDiningHalls = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, DINING_HALLS));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting dining halls: ', error);
      return [];
    }
  };
  
  // Get all discount places
  export const getDiscountPlaces = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, DISCOUNT_PLACES));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting discount places: ', error);
      return [];
    }
  };
  
  // Get a specific dining hall
  export const getDiningHall = async (id) => {
    try {
      const docRef = doc(db, DINING_HALLS, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        console.log('No such dining hall!');
        return null;
      }
    } catch (error) {
      console.error('Error getting dining hall: ', error);
      return null;
    }
  };
  
  // Get a specific discount place
  export const getDiscountPlace = async (id) => {
    try {
      const docRef = doc(db, DISCOUNT_PLACES, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        console.log('No such discount place!');
        return null;
      }
    } catch (error) {
      console.error('Error getting discount place: ', error);
      return null;
    }
  };
  
  
  // Add a new discount place
  export const addDiscountPlace = async (data) => {
    try {
      const docRef = await addDoc(collection(db, DISCOUNT_PLACES), {
        ...data,
        upvotes: 0,
        downvotes: 0,
        createdAt: new Date()
      });
      console.log('Discount place added with ID: ', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error adding discount place: ', error);
      return null;
    }
  };
  
  // Upvote a dining hall
  export const upvoteDiningHall = async (id) => {
    try {
      const docRef = doc(db, DINING_HALLS, id);
      await updateDoc(docRef, {
        upvotes: increment(1)
      });
      return true;
    } catch (error) {
      console.error('Error upvoting dining hall: ', error);
      return false;
    }
  };
  
  // Downvote a dining hall
  export const downvoteDiningHall = async (id) => {
    try {
      const docRef = doc(db, DINING_HALLS, id);
      await updateDoc(docRef, {
        downvotes: increment(1)
      });
      return true;
    } catch (error) {
      console.error('Error downvoting dining hall: ', error);
      return false;
    }
  };
  
  // Upvote a discount place
  export const upvoteDiscountPlace = async (id) => {
    try {
      const docRef = doc(db, DISCOUNT_PLACES, id);
      await updateDoc(docRef, {
        upvotes: increment(1)
      });
      return true;
    } catch (error) {
      console.error('Error upvoting discount place: ', error);
      return false;
    }
  };
  
  // Downvote a discount place
  export const downvoteDiscountPlace = async (id) => {
    try {
      const docRef = doc(db, DISCOUNT_PLACES, id);
      await updateDoc(docRef, {
        downvotes: increment(1)
      });
      return true;
    } catch (error) {
      console.error('Error downvoting discount place: ', error);
      return false;
    }
  };

  /**
 * Fetches the `menu` array from a dining‐hall document.
 */
export const getDiningMenu = async (diningHallId) => {
  try {
    const docRef = doc(db, 'dining halls', diningHallId);
    const snap = await getDoc(docRef);
    if (!snap.exists()) return [];
    // assumes your dining‐hall doc has a field `menu: [ { name, price, category, description }, … ]`
    return snap.data().menu || [];
  } catch (err) {
    console.error('Error fetching menu:', err);
    return [];
  }
};


// in firebase/services.js
export const searchDiningHallsByTerm = async (term) => {
  try {
    const halls = await getDiningHalls();              // :contentReference[oaicite:0]{index=0}&#8203;:contentReference[oaicite:1]{index=1}
    const q = term.trim().toLowerCase();
    const filtered = halls.filter(hall =>
      Array.isArray(hall.menu) &&
      hall.menu.some(item =>
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      )
    );
    // sort by (upvotes - downvotes) desc
    return filtered.sort((a, b) =>
      ((b.upvotes || 0) - (b.downvotes || 0)) -
      ((a.upvotes || 0) - (a.downvotes || 0))
    );
  } catch (error) {
    console.error('Error searching dining halls:', error);
    return [];
  }
};
