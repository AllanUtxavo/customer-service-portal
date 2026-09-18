import { getApiError } from '../utils/apiError';

interface ApiErrorMessageProps {
  error: unknown;
}

export function ApiErrorMessage({
  error,
}: ApiErrorMessageProps) {
  const apiError = getApiError(error);

  return (
    <div role="alert">
      <strong>{apiError.title}</strong>

      {apiError.detail && (
        <p>{apiError.detail}</p>
      )}

      {apiError.validationErrors &&
        Object.entries(
          apiError.validationErrors,
        ).map(([field, messages]) => (
          <div key={field}>
            <strong>{field}</strong>

            <ul>
              {messages.map((message) => (
                <li key={message}>
                  {message}
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
}