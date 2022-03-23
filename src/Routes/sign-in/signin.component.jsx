import {
    signInWithGooglePopup,
     createUserDocumentFromAuth 
} from '../../utiles/Firebase/firebase.utiles';

const SignIn = () => {
     const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef =await createUserDocumentFromAuth(user);
    } 
    return (
        <div>
            <h1> sign in page </h1>
            <button onClick={logGoogleUser}>Sign in with google</button>
         </div>
    )
};

export default SignIn;