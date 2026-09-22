import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { userManager } from '../auth/oidc';

export function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    userManager
      .signinRedirectCallback()
      .then(() => {
        navigate('/requests', {
          replace: true,
        });
      })
      .catch((error) => {
        console.error(
          'OIDC callback failed:',
          error,
        );
      });
  }, [navigate]);

  return (
    <main>
      <p>Completing sign in...</p>
    </main>
  );
}