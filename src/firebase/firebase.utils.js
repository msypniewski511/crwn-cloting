import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBYX84aRmNGwXiz9JIl7vKB8XK9fMeG7NA",
  authDomain: "crwn-clothing-80e82.firebaseapp.com",
  databaseURL: "https://crwn-clothing-80e82.firebaseio.com",
  projectId: "crwn-clothing-80e82",
  storageBucket: "crwn-clothing-80e82.appspot.com",
  messagingSenderId: "27482061177",
  appId: "1:27482061177:web:ae2991076d5de61b7197a8",
  measurementId: "G-MM8NT0WTKH"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('Error creating user', error.message);
    }

  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
