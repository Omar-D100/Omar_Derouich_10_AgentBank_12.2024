import './style.css'; // Importe le fichier CSS
import { useState } from 'react'; 
import useAuthStore from '../../components/state/store.js'; 
import { Navigate } from 'react-router-dom'; 
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

// Composant LoginForm pour la page de connexion
function LoginForm() {
  // États locaux pour gérer les champs du formulaire et les erreurs
  const [email, setEmail] = useState(''); // État pour l'email
  const [password, setPassword] = useState(''); // État pour le mot de passe
  const [error, setError] = useState(''); // État pour les messages d'erreur
  const [rememberMe, setRememberMe] = useState(false); // État pour "Se souvenir de moi"

  // Récupère le store d'authentification
  const authStore = useAuthStore();

  // Redirige vers /user si l'utilisateur est déjà connecté
  if (authStore.accessToken) {
    return <Navigate to="/user" />;
  }

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setError(''); // Réinitialise les erreurs

    try {
      // Envoie une requête POST pour se connecter
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }), // Corps de la requête avec l'email et le mot de passe
      });

      // Vérifie si la réponse est OK (statut 200-299)
      if (response.ok) {
        const data = await response.json(); // Extrait les données de la réponse
        console.log(data);
        const token = data.body.token;
        const profile = await fetch('http://localhost:3001/api/v1/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (profile.ok) {
          const profileData = await profile.json();
          authStore.login(profileData.body, token);
          console.log('Connexion réussie', authStore); // Affiche l'état du store (pour le débogage)
        alert('Connexion réussie !'); // Affiche une alerte de succès
        }
        // Met à jour le store d'authentification avec les informations de l'utilisateur et le token

      } else {
        // Gère les erreurs de la requête
        const errorData = await response.json();
        setError(errorData.message || 'Identifiants invalides'); // Affiche un message d'erreur
      }
    } catch (err) {
      // Gère les erreurs réseau ou autres
      console.error(err);
      setError('Une erreur est survenue lors de la connexion');
    }
  };

  export const isTokenExpired = (token: string | null) => {
    if (!token) return false;
    const decoded = jwtDecode(token);
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return true;
    }
    return false;
  };

  // Rendu du composant
  return (
    <main>
      <section className="sign-in-content">
        {/* Icône utilisateur */}
        <FontAwesomeIcon className="sign-in-icon " icon={faCircleUser} />
        <h1>Sign In</h1>
        {/* Formulaire de connexion */}
        <form onSubmit={handleSubmit}>
          {/* Champ pour l'email */}
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Met à jour l'état de l'email
            />
          </div>
          {/* Champ pour le mot de passe */}
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Met à jour l'état du mot de passe
            />
          </div>
          {/* Case à cocher "Se souvenir de moi" */}
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)} // Met à jour l'état de "Se souvenir de moi"
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {/* Bouton de soumission */}
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
          {/* Affichage des erreurs */}
          {error && <p className="error-message">{error}</p>}
        </form>
      </section>
    </main>
  );
}

// Exporte le composant LoginForm
export default LoginForm;