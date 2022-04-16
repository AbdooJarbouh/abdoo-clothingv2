import { Fragment, useContext } from 'react';
import { Outlet,Link} from 'react-router-dom';
import { ReactComponent as Abdoologo } from '../../assets/Alogo (3).svg';
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import CartDropdown from '../../components/Cart-dropdown/Cart-dropdown.component.jsx';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import { signOutUser } from '../../utiles/Firebase/firebase.utiles';
import {
    NavLink,
    LogoContainer,
    NavLinks,
    NavigationContainer,
    Logo
} from './navigation.styles.jsx';



const Navigation = () => {
    const { currentUser} = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);
    return (
<Fragment>
    <NavigationContainer>
        <LogoContainer to='/'>
                <Abdoologo className='logo' />
            </LogoContainer>

        <NavLinks>
                    <NavLink to='/Shop'>SHOP  </NavLink>
                    
                {currentUser ? (
                    <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
                ) : (                        
                    <NavLink to='/auth'>SIGN IN </NavLink>
                    )}
               
                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
    <Outlet />
</Fragment>
)
};
 
export default Navigation;