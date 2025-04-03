import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './index.scss'
import App from './components/app/App.tsx'
import store from './services/store.ts'
import { Provider } from 'react-redux'

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
