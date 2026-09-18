import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <header>
        <nav>
          <Link to="/requests">Service Request Portal</Link>

          {' | '}

          <Link to="/requests">Requests</Link>

          {' | '}

          <Link to="/requests/new">New Request</Link>
        </nav>
      </header>

      {children}
    </>
  );
}