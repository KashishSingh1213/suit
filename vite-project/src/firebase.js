import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore, doc, setDoc, getDocs, collection, query, where } from 'firebase/firestore';

// Helper to get Firebase configuration dynamically from localStorage
function getFirebaseConfig() {
  try {
    const saved = localStorage.getItem('gurnaaz_firebase_config');
    if (saved) {
      const config = JSON.parse(saved);
      // Ensure it contains actual config, not empty/placeholder values
      if (config.apiKey && config.apiKey !== 'YOUR_API_KEY' && config.apiKey.trim() !== '') {
        return config;
      }
    }
  } catch (e) {
    console.error("Failed to parse dynamic Firebase config:", e);
  }
  
  // Default fallback config
  return {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
}

let app;
export let db = null;

function initFirebase() {
  const firebaseConfig = getFirebaseConfig();
  try {
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApp();
    }
    db = getFirestore(app);
    console.log("Firebase initialized successfully with configuration:", firebaseConfig.projectId);
  } catch (err) {
    console.error("Firebase initialization failed:", err);
    db = null;
  }
}

// Initial initialization
initFirebase();

// Listen to runtime config changes (from Settings page saves)
if (typeof window !== 'undefined') {
  window.addEventListener('gurnaaz-firebase-updated', () => {
    console.log("Firebase config updated. Re-initializing Firebase...");
    initFirebase();
  });
}

// Checks if Firebase is active with real keys
export function isFirebaseConfigured() {
  const config = getFirebaseConfig();
  return config && config.apiKey && config.apiKey !== 'YOUR_API_KEY' && config.apiKey.trim() !== '';
}

/**
 * Saves or updates user profiles in the Firebase Firestore database
 */
export async function saveUserData(userProfile) {
  if (!isFirebaseConfigured() || !db) {
    console.warn("Firebase not configured. User profile saved locally.");
    return;
  }
  if (!userProfile || (!userProfile.email && !userProfile.phone)) return;
  
  const docId = userProfile.email || userProfile.phone;
  const userRef = doc(db, 'users', docId);
  
  try {
    await setDoc(userRef, {
      name: userProfile.name || 'Gurnaaz Member',
      email: userProfile.email || '',
      phone: userProfile.phone || '',
      updatedAt: new Date().toISOString()
    }, { merge: true });
    console.log("User data successfully stored in Firebase Firestore!");
  } catch (error) {
    console.error("Firebase Firestore write error: ", error);
  }
}

/**
 * Saves a product review to Firestore database
 */
export async function saveReviewToFirestore(productId, review) {
  if (!isFirebaseConfigured() || !db) {
    console.warn("Firebase is not configured. Review saved locally only.");
    return null;
  }
  try {
    const reviewId = review.id || `rev_${Date.now()}`;
    const reviewRef = doc(db, 'reviews', reviewId);
    
    const reviewData = {
      id: reviewId,
      productId: productId,
      name: review.name,
      rating: Number(review.rating),
      review: review.review,
      date: review.date || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      createdAt: new Date().toISOString()
    };
    
    await setDoc(reviewRef, reviewData);
    console.log(`Review ${reviewId} successfully stored in Firestore!`);
    return reviewData;
  } catch (error) {
    console.error("Firestore write review error: ", error);
    return null;
  }
}

/**
 * Fetches all reviews for a product from Firestore
 */
export async function fetchReviewsFromFirestore(productId) {
  if (!isFirebaseConfigured() || !db) {
    return [];
  }
  try {
    const reviewsCol = collection(db, 'reviews');
    const q = query(
      reviewsCol, 
      where('productId', '==', productId)
    );
    
    const querySnapshot = await getDocs(q);
    const reviews = [];
    querySnapshot.forEach((docSnap) => {
      reviews.push(docSnap.data());
    });
    
    // Sort client-side by date or createdAt descending
    reviews.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    return reviews;
  } catch (error) {
    console.error("Firestore fetch reviews error: ", error);
    return [];
  }
}

/**
 * Saves dynamic product rating average and override values to Firestore
 */
export async function saveProductRatingToFirestore(productId, avgRating, totalReviewsCount) {
  if (!isFirebaseConfigured() || !db) {
    return;
  }
  try {
    const productRef = doc(db, 'products_overrides', productId);
    await setDoc(productRef, {
      rating: Number(avgRating),
      reviewsCount: Number(totalReviewsCount),
      updatedAt: new Date().toISOString()
    }, { merge: true });
    console.log(`Rating for product ${productId} updated in Firestore to ${avgRating}`);
  } catch (error) {
    console.error("Firestore save product rating error: ", error);
  }
}

/**
 * Fetches product overrides (like average ratings) from Firestore
 */
export async function fetchProductOverridesFromFirestore() {
  if (!isFirebaseConfigured() || !db) {
    return {};
  }
  try {
    const overridesCol = collection(db, 'products_overrides');
    const querySnapshot = await getDocs(overridesCol);
    const overrides = {};
    querySnapshot.forEach((docSnap) => {
      overrides[docSnap.id] = docSnap.data();
    });
    return overrides;
  } catch (error) {
    console.error("Firestore fetch product overrides error: ", error);
    return {};
  }
}

/**
 * Saves a completed checkout order to the Firestore database
 */
export async function saveOrderToFirestore(orderId, orderDetails) {
  if (!isFirebaseConfigured() || !db) {
    console.warn("Firebase not configured. Order saved locally.");
    return null;
  }
  try {
    const orderRef = doc(db, 'orders', orderId);
    
    // Normalize properties
    const data = {
      id: orderId,
      orderId: orderId,
      customer: orderDetails.customer || orderDetails.shippingDetails?.name || 'Customer',
      email: orderDetails.email || orderDetails.shippingDetails?.email || '',
      phone: orderDetails.phone || orderDetails.shippingDetails?.phone || '',
      city: orderDetails.city || orderDetails.shippingDetails?.city || '',
      state: orderDetails.state || orderDetails.shippingDetails?.state || '',
      zip: orderDetails.zip || orderDetails.shippingDetails?.zip || '',
      address: orderDetails.address || orderDetails.shippingDetails?.address || '',
      amount: orderDetails.amount || `₹${(orderDetails.grandTotal || 0).toLocaleString()}`,
      amountNum: Number(orderDetails.grandTotal || 0),
      payment: orderDetails.payment || orderDetails.paymentMode || 'COD',
      status: orderDetails.status || 'Pending',
      date: orderDetails.date || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      createdAt: orderDetails.createdAt || new Date().toISOString(),
      items: (orderDetails.items || []).map(item => ({
        id: item.id || '',
        name: item.name || '',
        price: item.price || '',
        size: item.size || '',
        quantity: Number(item.quantity || 1),
        image: item.image || ''
      }))
    };
    
    await setDoc(orderRef, data);
    console.log(`Order ${orderId} successfully stored in Firestore!`);
    return data;
  } catch (error) {
    console.error("Firestore write order error: ", error);
    return null;
  }
}

/**
 * Fetches all orders from Firestore database
 */
export async function fetchOrdersFromFirestore() {
  if (!isFirebaseConfigured() || !db) {
    return [];
  }
  try {
    const ordersCol = collection(db, 'orders');
    const querySnapshot = await getDocs(ordersCol);
    const orders = [];
    querySnapshot.forEach((docSnap) => {
      orders.push(docSnap.data());
    });
    
    // Sort descending by date or createdAt
    orders.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    return orders;
  } catch (error) {
    console.error("Firestore fetch orders error: ", error);
    return [];
  }
}
