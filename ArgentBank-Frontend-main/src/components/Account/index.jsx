/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import Profil from '../Transaction/Transaction';
import './style.css';

// Composant `Account` pour afficher les détails d'un compte
export default function Account({ account, openAccountId, setOpenAccountId }) {
    // Vérifie si ce compte est actuellement ouvert
    const isOpen = openAccountId === account.id;
  
    return (
      <div>
        {/* Section principale du compte */}
        <section className="account">
          <div className="account-content-wrapper">
            {/* Contenu du compte (titre, montant, description) */}
            <div className="account-content">
              <h3 className="account-title">{account.title}</h3>
              <p className="account-amount">{account.amount}</p>
              <p className="account-amount-description">{account.description}</p>
            </div>
  
            {/* Bouton pour ouvrir/fermer les détails du compte */}
            <button
              onClick={() => setOpenAccountId(isOpen ? null : account.id)} // Change l'ID du compte ouvert
              className={`transaction-button ${isOpen ? 'active' : ''}`} // Ajoute une classe si le compte est ouvert
            >
              {/* Affiche une icône différente selon l'état (ouvert ou fermé) */}
              <FontAwesomeIcon icon={isOpen ? faXmark : faChevronRight} />
            </button>
          </div>
        </section>
  
        {/* Affiche les détails des transactions si le compte est ouvert */}
        {isOpen && (
          <div className="account-content-wrapper cta">
            <Profil accountId={account.id} onCancel={() => setOpenAccountId(null)} />
          </div>
        )}
      </div>
    );
  }