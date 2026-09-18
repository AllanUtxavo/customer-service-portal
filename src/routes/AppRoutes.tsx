import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { NewRequestPage } from '../pages/NewRequestPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { RequestDetailsPage } from '../pages/RequestDetailsPage';
import { RequestsPage } from '../pages/RequestsPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/requests" replace />}
      />

      <Route
        path="/requests"
        element={<RequestsPage />}
      />

      <Route
        path="/requests/new"
        element={<NewRequestPage />}
      />

      <Route
        path="/requests/:requestId"
        element={<RequestDetailsPage />}
      />

      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}