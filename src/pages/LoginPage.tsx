import { useAuth } from '../auth/AuthProvider';

export function LoginPage() {
  const { login } = useAuth();

  return (
    <main className="login-page">
      <section className="login-card">
        <h1>Customer Service Portal</h1>

        <p>
          Sign in securely to manage customer service requests.
        </p>

        <button
          type="button"
          onClick={() => void login()}
        >
          Sign in
        </button>
      </section>
    </main>
  );
}