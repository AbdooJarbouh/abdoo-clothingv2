import { Fragment } from 'react';
import './navigation.styles.scss'
import { Outlet,Link} from 'react-router-dom';
import { ReactComponent as Abdoologo } from '../../assets/Alogo (3).svg';

const Navigation = () => {
return (
<Fragment>
    <div className='navigation'>
        <Link className='logo-container' to='/'>
                <Abdoologo className='logo' />
            </Link>

        <div className="nav-links-container">
                <Link className="nav-link" to='/Shop'>Shop  </Link>
                <Link className="nav-link" to='/signin'>sign in </Link>

               
        </div>
    </div>
    <Outlet />
</Fragment>
)
};
 
export default Navigation;