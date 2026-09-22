import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <>
      <header>
        <nav>
          <Link to="/requests">Service Request Portal</Link>

          {' | '}

          <Link to="/requests">Requests</Link>

          {' | '}

          <Link to="/requests/new">New Request</Link>

          {isAuthenticated && (
            <>
              {' | '}

              <span>
                {user?.profile.name ??
                  user?.profile.preferred_username ??
                  'Authenticated user'}
              </span>

              {' '}

              <button type="button" onClick={() => void logout()}>
                Sign out
              </button>
            </>
          )}
        </nav>
      </header>

      {children}
    </>
  );
}