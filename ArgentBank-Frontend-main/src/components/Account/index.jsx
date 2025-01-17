/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import Profil from '../Transaction/Transaction';
import './style.css';

export default function Account({ account, openAccountId, setOpenAccountId }) {
  const isOpen = openAccountId === account.id;

  return (
    <div>
      <section className="account">
        <div className="account-content-wrapper">
          <div className="account-content">
            <h3 className="account-title">{account.title}</h3>
            <p className="account-amount">{account.amount}</p>
            <p className="account-amount-description">{account.description}</p>
          </div>
          <button
            onClick={() => setOpenAccountId(isOpen ? null : account.id)}
            className={`transaction-button ${isOpen ? 'active' : ''}`}
          >
            <FontAwesomeIcon icon={isOpen ? faXmark : faChevronRight} />
          </button>
        </div>
      </section>

      {isOpen && (
        <div className="account-content-wrapper cta">
          <Profil accountId={account.id} onCancel={() => setOpenAccountId(null)} />
        </div>
      )}
    </div>
  );
}