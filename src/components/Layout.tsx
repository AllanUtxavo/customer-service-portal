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
      <header className="app-header">
        <nav className="app-nav" aria-label="Main navigation">
          <Link className="app-brand" to="/requests">
            Service Request Portal
          </Link>

          {isAuthenticated && (
            <>
              <div className="nav-links">
                <Link className="nav-link" to="/requests">
                  Requests
                </Link>

                <Link className="nav-link" to="/requests/new">
                  New Request
                </Link>
              </div>

              <div className="user-area">
                <span className="user-name">
                  {user?.profile.name ??
                    user?.profile.preferred_username ??
                    'Authenticated user'}
                </span>

                <button
                  className="sign-out-button"
                  type="button"
                  onClick={() => void logout()}
                >
                  Sign out
                </button>
              </div>
            </>
          )}
        </nav>
      </header>

      {children}
    </>
  );
}