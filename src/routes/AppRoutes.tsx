import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { NewRequestPage } from '../pages/NewRequestPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { RequestDetailsPage } from '../pages/RequestDetailsPage';
import { RequestsPage } from '../pages/RequestsPage';
import { AuthCallbackPage } from '../pages/AuthCallbackPage';
import { LoginPage } from '../pages/LoginPage';
import { ProtectedRoute } from '../auth/ProtectedRoute';

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/requests" replace />}
      />

      <Route
        path="/requests"
        element={
            <ProtectedRoute>
                <RequestsPage />
            </ProtectedRoute>
        }
      />

      <Route
        path="/requests/new"
        element={
            <ProtectedRoute>
                <NewRequestPage />
            </ProtectedRoute>
        }
      />

      <Route
        path="/requests/:requestId"
        element={
            <ProtectedRoute>
                <RequestDetailsPage />
            </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={<NotFoundPage />}
      />

      <Route
        path="/callback"
        element={<AuthCallbackPage />}
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />
    </Routes>
  );
}