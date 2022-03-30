
import SignUpForm from '../../components/sign-up/sign-up-form.component'
import SignInForm from '../../components/sign-in/sign-in-form.component'
import './Authentication.styles.scss'

const Authentication = () => {
   
    return (
        <div className='auth-container'>
            <SignInForm />
            <SignUpForm />
         </div>
    )
};

export default Authentication;