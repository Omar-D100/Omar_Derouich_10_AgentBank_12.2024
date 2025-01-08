import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import useAuthStore from '../../components/state/store';
import UpdateForm from '../../components/updateForm';
import Profil from '../../components/Profil';
import accountsData from '../../data/AccountCard.json';
import './style.css';

export default function User() {
  const [isEditing, setIsEditing] = useState(false);
  const [openAccountId, setOpenAccountId] = useState(null);
  const authStore = useAuthStore();

  if (!authStore.accessToken) {
    return <Navigate to="/" />;
  }

  return (
    <main>
      <div className="header">
        <h1>Welcome back<br />{authStore.user.userName}!</h1>
        <button onClick={() => setIsEditing(true)} className="edit-button">
          Edit Name
        </button>
        {isEditing && <UpdateForm onCancel={() => setIsEditing(false)} />}
      </div>

      <h2 className="sr-only">Accounts</h2>
      {accountsData.accounts.map((account) => (
        <div key={account.id}>
          <section className="account">
            <div className="account-content-wrapper">
              <div className="acount-content">
                <h3 className="account-title">{account.title}</h3>
                <p className="account-amount">{account.amount}</p>
                <p className="account-amount-description">{account.description}</p>
              </div>
              <button
                onClick={() => setOpenAccountId(openAccountId === account.id ? null : account.id)}
                className={`transaction-button ${openAccountId === account.id ? 'active' : ''}`}
              >
                <FontAwesomeIcon icon={openAccountId === account.id ? faXmark : faChevronRight} />
              </button>
            </div>
          </section>

          {/* Déplacer account-content-wrapper en dehors de la section account */}
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