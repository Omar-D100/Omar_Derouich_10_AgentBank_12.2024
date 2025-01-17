// Import des fonctions nécessaires de Redux Toolkit et Redux Persist
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'; 
import storage from 'redux-persist/lib/storage'; 
import authReducer from './slice'; 
import transactionReducer from '../Transaction/TransactionSlice'; 

// Configuration de Redux Persist
const persistConfig = {
  key: 'auth', // Clé utilisée pour stocker les données persistantes
  storage, // Méthode de stockage (ici, localStorage)
};

// Crée un reducer persistant pour l'authentification
const persistedReducer = persistReducer(persistConfig, authReducer);

// Crée le store Redux
const store = configureStore({
  reducer: {
    auth: persistedReducer, // Reducer persistant pour l'authentification
    transactions: transactionReducer, // Reducer pour les transactions
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // Ignore les actions de Redux Persist pour éviter des avertissements
      },
    }),
});

// Crée un persistor pour gérer la persistance de l'état
export const persistor = persistStore(store);

// Exporte le store par défaut
export default store;