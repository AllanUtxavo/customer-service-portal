import { Link, useParams } from 'react-router-dom';

import { useServiceRequest } from '../hooks/useServiceRequest';
import { StatusUpdateForm } from '../components/StatusUpdateForm';

export function RequestDetailsPage() {
  const { requestId } = useParams<{
    requestId: string;
  }>();

  const {
    data: request,
    isLoading,
    isError,
    error,
  } = useServiceRequest(requestId);

  if (isLoading) {
    return (
      <main>
        <p>Loading request details...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main>
        <h1>Unable to load request</h1>

        <div role="alert">
          <p>
            {error instanceof Error
              ? error.message
              : 'An unexpected error occurred.'}
          </p>
        </div>

        <Link to="/requests">
          Back to requests
        </Link>
      </main>
    );
  }

  if (!request) {
    return (
      <main>
        <p>Request not found.</p>

        <Link to="/requests">
          Back to requests
        </Link>
      </main>
    );
  }

  return (
    <main>
      <Link to="/requests">
        ← Back to requests
      </Link>

      <h1>{request.title}</h1>

      <section>
        <h2>Request information</h2>

        <dl>
          <dt>ID</dt>
          <dd>{request.id}</dd>

          <dt>Status</dt>
          <dd>{request.status}</dd>

          <dt>Priority</dt>
          <dd>{request.priority}</dd>

          <dt>Category</dt>
          <dd>{request.category}</dd>

          <dt>Description</dt>
          <dd>{request.description}</dd>
        </dl>
      </section>

      <section>
        <h2>Requester</h2>

        <dl>
          <dt>Name</dt>
          <dd>{request.requesterName}</dd>

          <dt>Email</dt>
          <dd>{request.requesterEmail}</dd>
        </dl>
      </section>

      <section>
        <h2>Additional information</h2>

        <dl>
          <dt>Created</dt>
          <dd>
            {new Date(
              request.createdAt,
            ).toLocaleString()}
          </dd>

          <dt>Last updated</dt>
          <dd>
            {new Date(
              request.updatedAt,
            ).toLocaleString()}
          </dd>

          <dt>Version</dt>
          <dd>{request.version}</dd>
        </dl>
      </section>
      <StatusUpdateForm request={request} />
    </main>
  );
}