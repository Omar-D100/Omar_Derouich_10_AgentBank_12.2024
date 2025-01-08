import { create } from 'zustand';
import { persist, createJSONStorage } from "zustand/middleware";


const useAuthStore = create(
    persist(
      (set) => ({
        user: null, 
        accessToken: null, 
        
        setAccessToken: (token) => { set({ accessToken: token }) },

        login: (user, token) => 
            set({ user, accessToken: token }),
  
        logout: () => 
            set({ user: null, accessToken: null }),
        
        updateUser: (newData) =>
          set((state) => ({ user: { ...state.user, ...newData } })),
        
      }),
      {
        name: 'auth-storage', // Clé pour le localStorage
        storage: createJSONStorage(() => localStorage), // Utilise le localStorage
      }
    )
  );
  
export default useAuthStore;