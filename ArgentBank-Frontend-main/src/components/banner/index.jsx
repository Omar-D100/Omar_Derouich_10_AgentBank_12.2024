// Banner.js
import './style.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/slice'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/img/argentBankLogo.webp';

// Composant Banner 
function Banner() {
  // Récupère l'état de l'utilisateur depuis Redux
  const { user, accessToken } = useSelector((state) => state.auth);
  // Récupère la fonction dispatch pour déclencher des actions Redux
  const dispatch = useDispatch();
  // Hook de navigation pour rediriger l'utilisateur
  const navigate = useNavigate();

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    dispatch(logout()); // Déclenche l'action de déconnexion
    navigate('/'); // Redirige l'utilisateur vers la page d'accueil
  };

  // Rendu du composant
  return (
    <nav className="main-nav">
      {/* Logo de l'application avec un lien vers la page d'accueil */}
      <NavLink className="main-nav-logo" to={'/'}>
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
      </NavLink>

      {/* Conteneur pour les éléments de navigation */}
      <div className="main-nav-items">
        {accessToken ? ( // Vérifie si l'utilisateur est connecté
          <>
            {/* Lien vers le profil de l'utilisateur */}
            <NavLink to={'/user'} className="banner-item">
              <FontAwesomeIcon className="circleUser" icon={faCircleUser} />
              <span className="username">
                {user?.userName || 'Profile'} {/* Affiche le nom d'utilisateur ou "Profile" par défaut */}
              </span>
            </NavLink>

            {/* Bouton de déconnexion */}
            <button onClick={handleLogout} className="banner-item" aria-label="Logout">
              <FontAwesomeIcon className="powerOff" icon={faPowerOff} />
            </button>
          </>
        ) : (
          <>
            {/* Icône de profil pour les utilisateurs non connectés */}
            <FontAwesomeIcon className="circleUser" icon={faCircleUser} />

            {/* Lien vers la page de connexion */}
            <NavLink className="banner-item" to={'/signin'}>
              <button className="sign-in-button">Sign In</button>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Banner;