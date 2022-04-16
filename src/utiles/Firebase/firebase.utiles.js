import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    getDocs, 
    query,
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

export const addCollectionAndDocuments = async (collectionkey, objectsToAdd) => {
    const collectionRef = collection(db, collectionkey);
    const batch = writeBatch(db)

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object)
    });

    await batch.commit();
    console.log('finished writing')
};

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'catagories');
    const q = query(collectionRef)

    const querySnapShot = await getDocs(q)
    const categoryMap = querySnapShot.docs.reduce((acc, docSnapShot) => {
        const { title, items } = docSnapShot.data();
        acc[title.toLowerCase()] = items
        return acc;
    }, {});

    return categoryMap;
}


export const createUserDocumentFromAuth = async (userAuth) => {
    if (!userAuth) return;
    
    const userDocRef = doc(db, 'users', userAuth.uid)
     const userSnapshot = await getDoc(userDocRef);

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

export const signOutUser = async() => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
 onAuthStateChanged(auth, callback);
