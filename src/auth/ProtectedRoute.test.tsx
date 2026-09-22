import {
  render,
  screen,
} from '@testing-library/react';
import {
  MemoryRouter,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { ProtectedRoute } from './ProtectedRoute';

const useAuthMock = vi.fn();

vi.mock('./AuthProvider', () => ({
  useAuth: () => useAuthMock(),
}));

function LoginPageMock() {
  const location = useLocation();

  const state = location.state as
    | { from?: string }
    | null;

  return (
    <>
      <div>Login page</div>
      <div data-testid="redirect-from">
        {state?.from ?? ''}
      </div>
    </>
  );
}

function renderProtectedRoute() {
  return render(
    <MemoryRouter initialEntries={['/requests']}>
      <Routes>
        <Route
          path="/login"
          element={<LoginPageMock />}
        />

        <Route
          path="/requests"
          element={
            <ProtectedRoute>
              <div>Protected content</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>,
  );
}

describe('ProtectedRoute', () => {
  beforeEach(() => {
    useAuthMock.mockReset();
  });

  it('shows the authentication loading state', () => {
    useAuthMock.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
    });

    renderProtectedRoute();

    expect(
      screen.getByText(
        /checking authentication/i,
      ),
    ).toBeInTheDocument();
  });

  it('redirects unauthenticated users to login and preserves the requested path', () => {
    useAuthMock.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
    });

    renderProtectedRoute();

    expect(
      screen.getByText('Login page'),
    ).toBeInTheDocument();

    expect(
      screen.getByTestId('redirect-from'),
    ).toHaveTextContent('/requests');

    expect(
      screen.queryByText('Protected content'),
    ).not.toBeInTheDocument();
  });

  it('renders protected content for authenticated users', () => {
    useAuthMock.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
    });

    renderProtectedRoute();

    expect(
      screen.getByText('Protected content'),
    ).toBeInTheDocument();

    expect(
      screen.queryByText('Login page'),
    ).not.toBeInTheDocument();
  });
});