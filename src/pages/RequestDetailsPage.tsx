import { useParams } from 'react-router-dom';

export function RequestDetailsPage() {
  const { requestId } = useParams();

  return (
    <main>
      <h1>Request Details</h1>

      <p>Request ID: {requestId}</p>
    </main>
  );
}