import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// Replace with your actual Firebase config keys from the Firebase console
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

/**
 * Saves or updates user profiles in the Firebase Firestore database
 */
export async function saveUserData(userProfile) {
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
