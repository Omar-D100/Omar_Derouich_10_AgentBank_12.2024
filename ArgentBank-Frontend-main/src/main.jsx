import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './components/Redux/store'; 
import App from './app';

const root = createRoot(document.getElementById('root'));


root.render(
    // `Provider` permet à tous les composants de l'application d'accéder au store Redux
    <Provider store={store}>
      {/* `PersistGate` retarde le rendu de l'application jusqu'à ce que l'état persistant soit réhydraté */}
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );