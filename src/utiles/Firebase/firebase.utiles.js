import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
}from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDdCyyKyrHSIcmPFkekCDhhyTVlQH5oCzk",
    authDomain: "abdooclothingv2.firebaseapp.com",
    projectId: "abdooclothingv2",
    storageBucket: "abdooclothingv2.appspot.com",
    messagingSenderId: "1098261693229",
    appId: "1:1098261693229:web:c1dc6b6c74b4b529d489a4"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    if (!userAuth) return;
    
    const userDocRef = doc(db, 'users', userAuth.uid)
    console.log(userDocRef); 
     const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot); 

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date()

        try { 
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating user' ,error.massage);
        }
    }
return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};