import { useState } from 'react';

import { RequestTable } from '../components/RequestTable';
import { useServiceRequests } from '../hooks/useServiceRequests';
import { ApiErrorMessage } from '../components/ApiErrorMessage';

import type {
  ServiceRequestPriority,
  ServiceRequestStatus,
} from '../types/request';

export function RequestsPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<
    ServiceRequestStatus | ''
  >('');
  const [priority, setPriority] = useState<
    ServiceRequestPriority | ''
  >('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [sort, setSort] = useState<
  'createdAt' | '-createdAt'
   >('-createdAt');

  const {
    data,
    isLoading,
    isError,
    error,
  } = useServiceRequests({
    search: search || undefined,
    status: status || undefined,
    priority: priority || undefined,
    page,
    pageSize,
    sort,
  });

  return (
    <main>
      <h1>Service Requests</h1>

      <p>Manage customer service requests.</p>

      <section>
        <input
          type="search"
          placeholder="Search by title or requester..."
          value={search}
          onChange={(event) =>{
            setSearch(event.target.value);
            setPage(1);
          }}
          aria-label="Search service requests"
        />

        <select
          value={status}
          onChange={(event) =>{
            setStatus(
              event.target.value as
                | ServiceRequestStatus
                | '',
            );
            setPage(1);
          }}
          aria-label="Filter by status"
        >
          <option value="">All statuses</option>
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">
            In Progress
          </option>
          <option value="RESOLVED">Resolved</option>
          <option value="CLOSED">Closed</option>
        </select>

        <select
          value={priority}
          onChange={(event) => {
            setPriority(
              event.target.value as
                | ServiceRequestPriority
                | '',
            );
            setPage(1);
          }}
          aria-label="Filter by priority"
        >
          <option value="">All priorities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="CRITICAL">Critical</option>
        </select>
        <select
        value={sort}
        onChange={(event) => {
            setSort(
            event.target.value as
                | 'createdAt'
                | '-createdAt',
            );

            setPage(1);
        }}
        aria-label="Sort by creation date"
        >
        <option value="-createdAt">
            Newest first
        </option>

        <option value="createdAt">
            Oldest first
        </option>
        </select>
      </section>

      {isLoading && (
        <p>Loading service requests...</p>
      )}

      {isError && (
        <ApiErrorMessage error={error} />
       )}

      {!isLoading &&
        !isError &&
        data &&
        data.items.length === 0 && (
          <p>No service requests found.</p>
        )}

      {!isLoading &&
        !isError &&
        data &&
        data.items.length > 0 && (
          <>
            <RequestTable requests={data.items} />

            <div>
                <button
                    type="button"
                    onClick={() =>
                    setPage((currentPage) =>
                        Math.max(currentPage - 1, 1),
                    )
                    }
                    disabled={page <= 1}
                >
                    Previous
                </button>

                <span>
                    {' '}
                    Page {data.page} of {data.totalPages}{' '}
                </span>

                <button
                    type="button"
                    onClick={() =>
                    setPage((currentPage) =>
                        Math.min(
                        currentPage + 1,
                        data.totalPages,
                        ),
                    )
                    }
                    disabled={
                    data.totalPages === 0 ||
                    page >= data.totalPages
                    }
                >
                    Next
                </button>

                <p>Total requests: {data.total}</p>

                <label>
                    Requests per page:{' '}
                    <select
                    value={pageSize}
                    onChange={(event) => {
                        setPageSize(Number(event.target.value));
                        setPage(1);
                    }}
                    >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    </select>
                </label>
                </div>

            <p>Total requests: {data.total}</p>
          </>
        )}
    </main>
  );
}