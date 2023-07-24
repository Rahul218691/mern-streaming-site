import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'

import Loader from 'components/Loader';
import { AuthProvider } from 'context/authContext';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'styles/index.css'

const App = lazy(() => import('./App'))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
      </BrowserRouter>
    </Suspense>
)