import { RequestTable } from '../components/RequestTable';
import { useServiceRequests } from '../hooks/useServiceRequests';

export function RequestsPage() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useServiceRequests({
    page: 1,
    pageSize: 10,
    sort: '-createdAt',
  });

  if (isLoading) {
    return (
      <main>
        <h1>Service Requests</h1>
        <p>Loading service requests...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main>
        <h1>Service Requests</h1>

        <p>Unable to load service requests.</p>

        <p>
          {error instanceof Error
            ? error.message
            : 'Unknown error'}
        </p>
      </main>
    );
  }

  return (
    <main>
      <h1>Service Requests</h1>

      <p>
        Manage customer service requests.
      </p>

      {!data || data.items.length === 0 ? (
        <p>No service requests found.</p>
      ) : (
        <>
          <RequestTable requests={data.items} />

          <p>
            Page {data.page} of {data.totalPages}
          </p>

          <p>
            Total requests: {data.total}
          </p>
        </>
      )}
    </main>
  );
}