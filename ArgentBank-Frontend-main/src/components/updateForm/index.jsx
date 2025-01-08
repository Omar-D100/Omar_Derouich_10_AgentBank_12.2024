import { useState } from 'react'; // Hook pour gérer l'état local
import useAuthStore from '../state/store.js'; // Store d'authentification
import './style.css'; // Importation des styles CSS

// Fonction asynchrone pour mettre à jour le profil utilisateur via l'API
async function updateUserProfile(username, token) {
  if (!token) {
    console.error('Token non trouvé');
    throw new Error('Token non trouvé');
  }

  try {
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userName: username }),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour du nom d'utilisateur");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du nom d'utilisateur", error);
    throw error;
  }
}

// Composant React pour le formulaire de mise à jour du profil
// eslint-disable-next-line react/prop-types
const UpdateForm = ({ onCancel }) => {
  const [error, setError] = useState('');

  // Récupère les données de l'utilisateur depuis le store
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const accessToken = useAuthStore((state) => state.accessToken);

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = event.target.username.value.trim();

    if (!username) {
      setError('Le nom d\'utilisateur ne peut pas être vide');
      return;
    }

    if (!accessToken) {
      setError('Token non trouvé');
      return;
    }

    try {
      await updateUserProfile(username, accessToken);
      updateUser(username); // Met à jour le store avec le nouveau username
      setError('');
      onCancel(); // Ferme le formulaire
    } catch (error) {
      setError("Erreur lors de la mise à jour du nom d'utilisateur");
      console.error(error);
    }
  };

  // Rendu du formulaire
  return (
    <div className="edit-user-info">
      <h2>Edit user info</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>User name:</label>
          <input
            id="username"
            type="text"
            className="inputForm"
            defaultValue={user?.userName || ''} // Affiche le username actuel
          />
        </div>
        <div className="form-group">
          <label>First name:</label>
          <input
            id="firstname"
            type="text"
            className="inputForm cantChange"
            defaultValue={user?.firstName || ''} // Affiche le firstname actuel
            disabled
          />
        </div>
        <div className="form-group">
          <label>Last name:</label>
          <input
            id="lastname"
            type="text"
            className="inputForm cantChange"
            defaultValue={user?.lastName || ''} // Affiche le lastname actuel
            disabled
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="form-actions">
          <button type="submit" className="submitForm">
            Save
          </button>
          <button type="button" onClick={onCancel} className="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateForm;