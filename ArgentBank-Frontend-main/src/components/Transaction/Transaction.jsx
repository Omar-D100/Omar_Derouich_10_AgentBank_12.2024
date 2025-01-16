import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronDown, faPencil } from '@fortawesome/free-solid-svg-icons';
import { updateNote, updateCategory, toggleEdit, toggleDetails } from './TransactionSlice'; 
import './style.css';

const Transaction = () => {
  // Récupère l'état des transactions depuis Redux
  const { transactions, openTransactionId } = useSelector((state) => state.transactions);

  // Récupère la fonction dispatch pour déclencher des actions Redux
  const dispatch = useDispatch();

  // Sauvegarde les transactions dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);


  
  // Fonction pour mettre à jour la note d'une transaction
  const handleNoteChange = (transactionId, newNote) => {
    dispatch(updateNote({ transactionId, newNote }));
  };

  // Fonction pour mettre à jour la catégorie d'une transaction
  const handleCategoryChange = (transactionId, newCategory) => {
    dispatch(updateCategory({ transactionId, newCategory }));
  };

  // Fonction pour activer/désactiver le mode édition d'une transaction
  const handleEdit = (transactionId, field) => {
    dispatch(toggleEdit({ transactionId, field }));
  };

  // Fonction pour afficher/masquer les détails d'une transaction
  const handleViewDetails = (transactionId) => {
    dispatch(toggleDetails(transactionId));
  };







  // Rendu du composant
  return (
    <div className="transaction-container">
      <div className="transaction-detail">
        <div className="transaction-row">
          <div className="transaction-cell">Date</div>
          <div className="transaction-cell">Description</div>
          <div className="transaction-cell">Amount</div>
          <div className="transaction-cell">Balance</div>
        </div>
      </div>
      {/* Boucle sur les transactions pour les afficher */}
      {transactions.map((transaction) => (
        <div className="transaction-header" key={transaction.id}>
          {/* Informations de base de la transaction */}
          <div className="transaction-info">
            <div>{transaction.date}</div>
            <div>{transaction.description}</div>
            <div>{transaction.amount}</div>
            <div>{transaction.balance}</div>
            {/* Bouton pour afficher/masquer les détails */}
            <button
              onClick={() => handleViewDetails(transaction.id)}
              className="arrow-button"
            >
              {openTransactionId === transaction.id ? (
                <FontAwesomeIcon icon={faChevronDown} />
              ) : (
                <FontAwesomeIcon icon={faChevronRight} />
              )}
            </button>
          </div>

          {/* Détails de la transaction (affichés si ouverts) */}
          {openTransactionId === transaction.id && (
            <div className="transaction-details">
              {/* Type de transaction */}
              <div className="detail">
                <strong>Transaction type:</strong> <span className="param">{transaction.type}</span>
              </div>
              {/* Catégorie de la transaction */}
              <div className="detail2">
                <strong>
                  <span>Category:</span>
                </strong>
                <span className="param2">
                  {transaction.isEditingCategory ? (
                    // Menu déroulant pour éditer la catégorie
                    <select
                      value={transaction.category}
                      onChange={(e) =>
                        handleCategoryChange(transaction.id, e.target.value)
                      }
                    >
                      <option value="Food">Food</option>
                      <option value="Transport">Transport</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Utilities">Utilities</option>
                    </select>
                  ) : (
                    // Affichage de la catégorie
                    <span>{transaction.category}</span>
                  )}
                </span>
                {/* Bouton pour éditer/sauvegarder la catégorie */}
                <button
                  className="edit-pencil"
                  onClick={() => handleEdit(transaction.id, 'category')}
                >
                  {transaction.isEditingCategory ? 'Save' : <FontAwesomeIcon icon={faPencil} />}
                </button>
              </div>
              {/* Note de la transaction */}
              <div className="detail2">
                <strong>
                  <span>Note:</span>
                </strong>
                <span className="param3">
                  {transaction.isEditingNote ? (
                    // Champ de texte pour éditer la note
                    <input
                      type="text"
                      value={transaction.note}
                      onChange={(e) =>
                        handleNoteChange(transaction.id, e.target.value)
                      }
                    />
                  ) : (
                    // Affichage de la note
                    <span>{transaction.note}</span>
                  )}
                </span>
                {/* Bouton pour éditer/sauvegarder la note */}
                <button
                  className="edit-pencil"
                  onClick={() => handleEdit(transaction.id, 'note')}
                >
                  {transaction.isEditingNote ? 'Save' : <FontAwesomeIcon icon={faPencil} />}
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Transaction;