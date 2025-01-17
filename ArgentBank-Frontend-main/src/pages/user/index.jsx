import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UpdateForm from '../../components/updateForm';
import Account from '../../components/Account';
import accountsData from '../../data/AccountCard.json';
import './style.css';

// Composant principal `User`
export default function User() {
  // État local pour gérer l'affichage du formulaire de mise à jour
  const [isEditing, setIsEditing] = useState(false);

  // État local pour gérer l'ouverture/fermeture des détails d'un compte
  const [openAccountId, setOpenAccountId] = useState(null);

  // Récupération des données d'authentification depuis Redux
  const { accessToken, user } = useSelector((state) => state.auth);

  // Si l'utilisateur n'est pas connecté (pas de `accessToken`), on le redirige vers la page d'accueil
  if (!accessToken) {
    return <Navigate to="/" />;
  }

  // Rendu du composant
  return (
    <main>
      {/* En-tête de la page */}
      <div className="header">
        {/* Message de bienvenue avec le nom d'utilisateur */}
        <h1>Welcome back<br />{user.userName}!</h1>

        {/* Bouton pour activer le formulaire de mise à jour du nom */}
        <button onClick={() => setIsEditing(true)} className="edit-button">
          Edit Name
        </button>

        {/* Affichage conditionnel du formulaire de mise à jour */}
        {isEditing && <UpdateForm onCancel={() => setIsEditing(false)} />}
      </div>

      {/* Titre masqué visuellement mais accessible aux lecteurs d'écran */}
      <h2 className="sr-only">Accounts</h2>

      {/* Boucle pour afficher chaque compte */}
      {accountsData.accounts.map((account) => (
        <Account
          key={account.id} // Clé unique pour chaque compte
          account={account} // Données du compte
          openAccountId={openAccountId} // ID du compte actuellement ouvert
          setOpenAccountId={setOpenAccountId} // Fonction pour ouvrir/fermer un compte
        />
      ))}
    </main>
  );
}