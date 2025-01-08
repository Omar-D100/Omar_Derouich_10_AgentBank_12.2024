import './style.css';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuthStore from '../state/store.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/img/argentBankLogo.png';

function Banner() {
  const user = useAuthStore();
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to={'/'}>
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
      </NavLink>
      <div className="main-nav-items">
        {user.accessToken ? (
          <>
            <NavLink to={'/user'} className="banner-item">
              <FontAwesomeIcon className="circleUser" icon={faCircleUser} />
              <span className="username">{user.user?.userName || 'Profile'}</span>
            </NavLink>
            <button onClick={handleLogout} className="banner-item" aria-label="Logout">
              <FontAwesomeIcon className="powerOff" icon={faPowerOff} />
            </button>
          </>
        ) : (
          <>
            <FontAwesomeIcon className="circleUser" icon={faCircleUser} />
            <NavLink className="banner-item" to={'/signin'}>
              <button className='sign-in-button'>Sign In</button>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Banner;