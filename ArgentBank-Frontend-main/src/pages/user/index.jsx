import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux'; 
import UpdateForm from '../../components/updateForm';
import Profil from '../../components/Transaction/Transaction';
import accountsData from '../../data/AccountCard.json';
import './style.css';

// Composant principal User
export default function User() {
  // État pour gérer l'affichage du formulaire de modification du nom
  const [isEditing, setIsEditing] = useState(false);

  // État pour gérer l'ouverture/fermeture des détails d'un compte spécifique
  const [openAccountId, setOpenAccountId] = useState(null);

  // Récupération de l'état d'authentification avec useSelector
  const { accessToken, user } = useSelector((state) => state.auth);

  // Si l'utilisateur n'est pas authentifié, redirige vers la page d'accueil
  if (!accessToken) {
    return <Navigate to="/" />;
  }



  
  // Rendu du composant
  return (
    <main>
      {/* En-tête de la page */}
      <div className="header">
        {/* Message de bienvenue avec le nom de l'utilisateur */}
        <h1>Welcome back<br />{user.userName}!</h1>

        {/* Bouton pour activer le formulaire de modification du nom */}
        <button onClick={() => setIsEditing(true)} className="edit-button">
          Edit Name
        </button>

        {/* Affiche le formulaire de modification si isEditing est true */}
        {isEditing && <UpdateForm onCancel={() => setIsEditing(false)} />}
      </div>

      {/* Section des comptes utilisateur */}
      <h2 className="sr-only">Accounts</h2> {/* Texte masqué pour l'accessibilité */}

      {/* Boucle sur les comptes pour les afficher */}
      {accountsData.accounts.map((account) => (
        <div key={account.id}>
          {/* Section pour chaque compte */}
          <section className="account">
            <div className="account-content-wrapper">
              {/* Contenu du compte (titre, montant, description) */}
              <div className="acount-content">
                <h3 className="account-title">{account.title}</h3>
                <p className="account-amount">{account.amount}</p>
                <p className="account-amount-description">{account.description}</p>
              </div>

              {/* Bouton pour ouvrir/fermer les détails du compte */}
              <button
                onClick={() => setOpenAccountId(openAccountId === account.id ? null : account.id)}
                className={`transaction-button ${openAccountId === account.id ? 'active' : ''}`}
              >
                {/* Change l'icône en fonction de l'état (ouvert/fermé) */}
                <FontAwesomeIcon icon={openAccountId === account.id ? faXmark : faChevronRight} />
              </button>
            </div>
          </section>

          {/* Affiche les détails du compte si ouvert */}
          {openAccountId === account.id && (
            <div className="account-content-wrapper cta">
              <Profil accountId={account.id} onCancel={() => setOpenAccountId(null)} />
            </div>
          )}
        </div>
      ))}
    </main>
  );
}