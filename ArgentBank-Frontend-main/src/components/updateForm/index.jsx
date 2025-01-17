// UpdateForm.js
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { updateUser } from '../Redux/slice'; 
import './style.css';

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
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur lors de la mise à jour du nom d'utilisateur");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du nom d'utilisateur", error);
    throw error;
  }
}

// Composant UpdateForm pour modifier les informations de l'utilisateur
// eslint-disable-next-line react/prop-types
const UpdateForm = ({ onCancel }) => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Récupère l'état de l'utilisateur et le token depuis Redux
  const { user, accessToken } = useSelector((state) => state.auth);

  // Récupère la fonction dispatch pour déclencher des actions Redux
  const dispatch = useDispatch();

  // Gestion de la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const username = event.target.username.value.trim();

    if (!username) {
      setError('Le nom d\'utilisateur ne peut pas être vide');
      setIsLoading(false);
      return;
    }

    try {
      // Appel de la fonction pour mettre à jour le profil utilisateur via l'API
      await updateUserProfile(username, accessToken);

      // Met à jour l'état Redux avec le nouveau nom d'utilisateur
      dispatch(updateUser({ userName: username }));

      // Réinitialise l'erreur et ferme le formulaire
      setError('');
      onCancel();
    } catch (error) {
      setError(error.message || "Erreur lors de la mise à jour du nom d'utilisateur");
      console.error(error);
    } finally {
      setIsLoading(false);
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
            defaultValue={user?.userName || ''}
          />
        </div>

        <div className="form-group">
          <label>First name:</label>
          <input
            id="firstname"
            type="text"
            className="inputForm cantChange"
            defaultValue={user?.firstName || ''}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Last name:</label>
          <input
            id="lastname"
            type="text"
            className="inputForm cantChange"
            defaultValue={user?.lastName || ''}
            disabled
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="form-actions">
          <button type="submit" className="submitForm" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save'}
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