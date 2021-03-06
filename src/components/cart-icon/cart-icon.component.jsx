import './cart-icon.styles.scss';
import { useContext } from "react";

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag (1).svg';
import { CartContext } from '../../contexts/cart.context';

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen,cartCount } = useContext(CartContext);
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
    

    return (
        <div className="cart-icon-container" onClick={toggleIsCartOpen}>
            <ShoppingIcon className="cart-icon" />
            <span className='item-count'> {cartCount} </span>
        </div>
    );
};

export default CartIcon;