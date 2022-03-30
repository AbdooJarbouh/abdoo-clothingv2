import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utiles/Firebase/firebase.utiles';
import './sign-up-form.styles.scss'
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    
    const resetForm = () => {
        setFormFields(defaultFormFields)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("passwords don't match")
    return;
        }        
        try { 
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            );
            await createUserDocumentFromAuth(user, {displayName});
            resetForm()
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('cannot create account ,Email already in use');
          
            } if (error.code === 'auth/weak-password') {
                alert('password must be at least 6 characters ');
          
            } else {
                alert('something went wrong ,please try again later');
            }
        };
    };
        const handleChange = (event) => {
            const { name, value } = event.target;
            setFormFields({ ...formFields, [name]: value });
        };
return (
    <div className="sign-up-container">
        <h2> don't have an account ? </h2>
        <span>sign up with your email and password</span>

        <form onSubmit={handleSubmit}>

                    <FormInput
            label='Display Name'
            type='text'
            required
            onChange={handleChange}
            name='displayName'
            value={displayName}
            />

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

            <FormInput
                    label='Confirm Password'
                type="password"
                required
                onChange={handleChange}
                name="confirmPassword"
                value={confirmPassword}
            />
            <Button type="submit">sign UP</Button>
        </form>
    </div>
);
};

export default SignUpForm;