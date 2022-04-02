import { Fragment, useContext } from 'react';
import { Outlet,Link} from 'react-router-dom';
import { ReactComponent as Abdoologo } from '../../assets/Alogo (3).svg';
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import CartDropdown from '../../components/Cart-dropdown/Cart-dropdown.component.jsx';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import { signOutUser } from '../../utiles/Firebase/firebase.utiles';
import './navigation.styles.scss';



const Navigation = () => {
    const { currentUser} = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);
    return (
<Fragment>
    <div className='navigation'>
        <Link className='logo-container' to='/'>
                <Abdoologo className='logo' />
            </Link>

        <div className="nav-links-container">
                <Link className="nav-link" to='/Shop'>Shop  </Link>
                {currentUser ? (
                    <span className="nav-link" onClick={signOutUser}>sign out</span>
                ) : (                        
                    <Link className="nav-link" to='/auth'>sign in </Link>
                    )}
                    
                    <CartIcon />
                </div>
                {isCartOpen && <CartDropdown />}
            </div>
    <Outlet />
</Fragment>
)
};
 
export default Navigation;