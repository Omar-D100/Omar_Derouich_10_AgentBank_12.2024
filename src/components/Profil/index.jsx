// Importation des hooks, styles et données nécessaires
import { useState, useEffect } from 'react'; // Hooks pour gérer l'état local et les effets
import './style.css'; // Importation des styles CSS
import data from '../../data/FeaturesItem.json'; // Importe les données JSON des transactions
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importe FontAwesome pour les icônes
import { faChevronRight, faChevronDown ,faPencil } from '@fortawesome/free-solid-svg-icons'; // Importe les icônes chevron

// Composant Transaction pour afficher et gérer les transactions
const Transaction = () => {
  // État pour gérer les transactions
  const [transactions, setTransactions] = useState(() => {
    // Charge les transactions depuis localStorage ou le fichier JSON
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : data.transactions;
  });

  // État pour gérer l'ouverture/fermeture des détails d'une transaction
  const [openTransactionId, setOpenTransactionId] = useState(null);

  // Sauvegarde les transactions dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Fonction pour mettre à jour la note d'une transaction
  const handleNoteChange = (transactionId, newNote) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === transactionId
          ? { ...transaction, note: newNote } // Met à jour la note
          : transaction
      )
    );
  };

  // Fonction pour mettre à jour la catégorie d'une transaction
  const handleCategoryChange = (transactionId, newCategory) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === transactionId
          ? { ...transaction, category: newCategory } // Met à jour la catégorie
          : transaction
      )
    );
  };

  // Fonction pour activer/désactiver le mode édition d'une transaction
  const handleEdit = (transactionId, field) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === transactionId
          ? {
              ...transaction,
              isEditingNote: field === 'note' ? !transaction.isEditingNote : false, // Active/désactive l'édition de la note
              isEditingCategory:
                field === 'category' ? !transaction.isEditingCategory : false, // Active/désactive l'édition de la catégorie
            }
          : transaction
      )
    );
  };

  // Fonction pour afficher/masquer les détails d'une transaction
  const handleViewDetails = (transactionId) => {
    setOpenTransactionId(openTransactionId === transactionId ? null : transactionId);
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
            <div>{transaction.date}</div> {/* Date de la transaction */}
            <div>{transaction.description}</div> {/* Description de la transaction */}
            <div>{transaction.amount}</div> {/* Montant de la transaction */}
            <div>{transaction.balance}</div> {/* Solde après la transaction */}
            {/* Bouton pour afficher/masquer les détails */}
            <button
              onClick={() => handleViewDetails(transaction.id)}
              className="arrow-button"
            >
              {openTransactionId === transaction.id ? <FontAwesomeIcon icon={faChevronDown} /> :<FontAwesomeIcon icon={faChevronRight} />}
            </button>
          </div>

          {/* Détails de la transaction (affichés si ouverts) */}
          {openTransactionId === transaction.id && (
            <div className="transaction-details">
              {/* Type de transaction */}
              <div className="detail">
                <strong>Transaction type:</strong> <span className='param'>{transaction.type}</span>
              </div>
              {/* Catégorie de la transaction */}
              <div className="detail2">
                <strong ><span>Category:</span></strong>
                <span className='param2'>{transaction.isEditingCategory ? (
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
                )}</span>
                {/* Bouton pour éditer/sauvegarder la catégorie */}
                <button className='edit-pencil' onClick={() => handleEdit(transaction.id, 'category')}>
                  {transaction.isEditingCategory ? 'Save' : <FontAwesomeIcon icon={faPencil} />}
                </button>
              </div>
              {/* Note de la transaction */}
              <div className="detail2">
                <strong ><span>Note:</span></strong>
                <span className='param3'>{transaction.isEditingNote ? (
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
                <button  className='edit-pencil'onClick={() => handleEdit(transaction.id, 'note')}>
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

// Exporte le composant Transaction
export default Transaction;