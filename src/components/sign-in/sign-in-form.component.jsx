import { useState, } from 'react';
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
} from '../../utiles/Firebase/firebase.utiles';
import './sign-in-form.styles.scss'
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

const defaultFormFields = {
    email: '',
    password: '',
}
const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password} = formFields;

    const resetForm = () => {
        setFormFields(defaultFormFields)
    };
    const SignInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    } 

    const handleSubmit = async (event) => {
        event.preventDefault();
      
        try {
            const {user} = await signInAuthUserWithEmailAndPassword(
                email,
                password
            );
            resetForm();
        } catch (error) {
            switch (error.code) {

                case 'auth/user-not-found':
                    alert('user not found ,please check your email and password')
                    break;
                case 'auth/wrong-password':
                    alert('incorrect password')
                    break;
                default:
                    console.log(error)
            }
            
         }
    };
        const handleChange = (event) => {
            const { name, value } = event.target;
            setFormFields({ ...formFields, [name]: value });
        };
    return (
        <div className="sign-up-container">
            <h2> already have an account ? </h2>
            <span>sign in with your email and password</span>

            <form onSubmit={handleSubmit}>

                <FormInput
                    label='Email'
                    type='email'
                    required
                    onChange={handleChange}
                    name='email'
                    value={email}
                />

                <FormInput
                    label='Password'
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                />

                <div className='button-containe'>

                    <Button type="submit">sign in</Button>
                    <Button type="button" buttontype="google" onClick={SignInWithGoogle}> sign in with google</Button>
                
                </div>
            </form>
        </div>
    );
};

export default SignInForm;