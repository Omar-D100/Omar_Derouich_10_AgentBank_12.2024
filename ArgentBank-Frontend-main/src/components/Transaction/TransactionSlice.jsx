import { createSlice } from '@reduxjs/toolkit';

// Charge les transactions depuis localStorage ou utilise les données par défaut
const loadTransactionsFromLocalStorage = () => {
  const savedTransactions = localStorage.getItem('transactions');
  return savedTransactions ? JSON.parse(savedTransactions) : [];
};

// Crée un slice pour les transactions
const transactionSlice = createSlice({
  name: 'transactions', // Nom du slice
  initialState: {
    transactions: loadTransactionsFromLocalStorage(), // Charge les transactions initiales
    openTransactionId: null, // ID de la transaction ouverte (pour afficher les détails)
  },
  reducers: {
    // Action pour mettre à jour la note d'une transaction
    updateNote: (state, action) => {
      const { transactionId, newNote } = action.payload;
      state.transactions = state.transactions.map((transaction) =>
        transaction.id === transactionId
          ? { ...transaction, note: newNote } // Met à jour la note
          : transaction
      );
    },
    // Action pour mettre à jour la catégorie d'une transaction
    updateCategory: (state, action) => {
      const { transactionId, newCategory } = action.payload;
      state.transactions = state.transactions.map((transaction) =>
        transaction.id === transactionId
          ? { ...transaction, category: newCategory } // Met à jour la catégorie
          : transaction
      );
    },
    // Action pour activer/désactiver le mode édition d'une transaction
    toggleEdit: (state, action) => {
      const { transactionId, field } = action.payload;
      state.transactions = state.transactions.map((transaction) =>
        transaction.id === transactionId
          ? {
              ...transaction,
              isEditingNote: field === 'note' ? !transaction.isEditingNote : false,
              isEditingCategory: field === 'category' ? !transaction.isEditingCategory : false,
            }
          : transaction
      );
    },
    // Action pour afficher/masquer les détails d'une transaction
    toggleDetails: (state, action) => {
      const transactionId = action.payload;
      state.openTransactionId =
        state.openTransactionId === transactionId ? null : transactionId;
    },
  },
});

// Export des actions
export const { updateNote, updateCategory, toggleEdit, toggleDetails } = transactionSlice.actions;

// Export du reducer
export default transactionSlice.reducer;