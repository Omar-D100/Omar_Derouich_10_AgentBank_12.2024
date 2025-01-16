import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './components/Redux/store'; // Importe le store et le persistor
import App from './app'; // Importe le composant App

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App /> {/* Utilise le composant App pour gérer le routage */}
    </PersistGate>
  </Provider>
);