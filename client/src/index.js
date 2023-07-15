import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';

import 'styles/index.css'
import Loader from 'components/Loader';

const App = lazy(() => import('./App'))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
)