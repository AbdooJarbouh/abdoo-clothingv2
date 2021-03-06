import './Checkout-item.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({ cartItem }) => {
    const { removeitemFromCart, addItemToCart,clearItemFromCart } = useContext(CartContext);
    const { name, price, imageUrl, quantity, } = cartItem;
    const clearCartItemHandler = () => clearItemFromCart(cartItem);
    const addItem =()=> addItemToCart(cartItem);
    const removeItem =()=> removeitemFromCart(cartItem);

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={`${name}`} />
            </div> 
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div
                    className='arrow'
                    onClick={removeItem}>
                    &#10094;
                </div>
                <span className='value'> {quantity}</span>
                <div
                    className='arrow'
                    onClick={addItem}>
                    &#10095;
                </div>
            </span>

            <span className='price'>
                ${price}
            </span>
            <div
                className='remove-button'
                onClick={clearCartItemHandler}>
                &#10005;
            </div>
        </div>
    )
};

export default CheckoutItem;
