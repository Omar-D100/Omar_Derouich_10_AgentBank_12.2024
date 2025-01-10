import { useState } from 'react';
import useAuthStore from '../state/store.js';
import './style.css';

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

// eslint-disable-next-line react/prop-types
const UpdateForm = ({ onCancel }) => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const accessToken = useAuthStore((state) => state.accessToken);

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
      await updateUserProfile(username, accessToken);
      updateUser({ userName: username }); // Met à jour le store avec le nouveau username
      setError('');
      onCancel(); // Ferme le formulaire
    } catch (error) {
      setError(error.message || "Erreur lors de la mise à jour du nom d'utilisateur");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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