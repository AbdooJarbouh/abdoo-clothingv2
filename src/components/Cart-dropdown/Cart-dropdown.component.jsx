import {
  CartItems,
  EmptyMessage,
  CartDropdownContainer
 } from './Cart-dropdown.styles.jsx';
import Button from '../button/button.component';
import CartItem from '../cart-items/cart-items.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';



const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  
  const goToCheckoutPage = () => {
    navigate('/checkout')
  }
  
    return (
      <CartDropdownContainer>
        <CartItems>
          {cartItems.length ? (
            cartItems.map((cartItem) => (
              <CartItem key={cartItem.id} cartItem={cartItem} />
            ))
          ) : (
            <EmptyMessage>Your cart is empty</EmptyMessage>
          )}
        </CartItems>
        <Button onClick={goToCheckoutPage}>GO TO CHECKOUT</Button>
      </CartDropdownContainer>
    );
  };
  
  export default CartDropdown;