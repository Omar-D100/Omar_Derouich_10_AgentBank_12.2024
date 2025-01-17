// Import de la fonction `createSlice` de Redux Toolkit pour créer un slice Redux
import { createSlice } from '@reduxjs/toolkit';

// Création du slice `authSlice` pour gérer l'authentification
const authSlice = createSlice({
  name: 'auth', // Nom du slice (utilisé dans les actions et le state global)
  initialState: {
    user: null, // Stocke les informations de l'utilisateur connecté
    accessToken: null, // Stocke le token d'accès de l'utilisateur
  },
  reducers: {
    // Reducer pour définir le token d'accès
    setAccessToken: (state, action) => {
      state.accessToken = action.payload; // Met à jour le token avec la valeur passée en payload
    },

    // Reducer pour gérer la connexion de l'utilisateur
    login: (state, action) => {
      state.user = action.payload.user; // Met à jour les informations de l'utilisateur
      state.accessToken = action.payload.token; // Met à jour le token d'accès
    },

    // Reducer pour gérer la déconnexion de l'utilisateur
    logout: (state) => {
      state.user = null; // Réinitialise les informations de l'utilisateur
      state.accessToken = null; // Réinitialise le token d'accès
    },

    // Reducer pour mettre à jour les informations de l'utilisateur
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }; // Fusionne les anciennes et nouvelles données de l'utilisateur
    },
  },
});

// Export des actions générées automatiquement par `createSlice`
export const { setAccessToken, login, logout, updateUser } = authSlice.actions;

// Export du reducer généré par `createSlice`
export default authSlice.reducer;