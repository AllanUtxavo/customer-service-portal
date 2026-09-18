import { useState } from 'react';

import { useUpdateRequestStatus } from '../hooks/useUpdateRequestStatus';
import { getAllowedStatusTransitions } from '../utils/statusTransitions';

import type {
  ServiceRequest,
  ServiceRequestStatus,
} from '../types/request';

interface StatusUpdateFormProps {
  request: ServiceRequest;
}

export function StatusUpdateForm({
  request,
}: StatusUpdateFormProps) {
  const transitions =
    getAllowedStatusTransitions(request.status);

  const [status, setStatus] =
    useState<ServiceRequestStatus | ''>('');

  const [note, setNote] = useState('');

  const mutation = useUpdateRequestStatus();

  if (transitions.length === 0) {
    return (
      <section>
        <h2>Update status</h2>

        <p>
          This request is closed and cannot
          transition to another status.
        </p>
      </section>
    );
  }

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!status) {
      return;
    }

    mutation.mutate(
      {
        requestId: request.id,

        data: {
          status,
          version: request.version,
          note: note || undefined,
        },
      },
      {
        onSuccess: () => {
          setStatus('');
          setNote('');
        },
      },
    );
  };

  return (
    <section>
      <h2>Update status</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="new-status">
            New status
          </label>

          <select
            id="new-status"
            value={status}
            onChange={(event) =>
              setStatus(
                event.target
                  .value as ServiceRequestStatus,
              )
            }
            required
          >
            <option value="">
              Select status
            </option>

            {transitions.map((transition) => (
              <option
                key={transition}
                value={transition}
              >
                {transition.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="status-note">
            Note (optional)
          </label>

          <textarea
            id="status-note"
            value={note}
            maxLength={500}
            onChange={(event) =>
              setNote(event.target.value)
            }
          />
        </div>

        {mutation.isError && (
          <div role="alert">
            <p>
              Unable to update request status.
            </p>

            <p>
              {mutation.error instanceof Error
                ? mutation.error.message
                : 'An unexpected error occurred.'}
            </p>
          </div>
        )}

        {mutation.isSuccess && (
          <p role="status">
            Status updated successfully.
          </p>
        )}

        <button
          type="submit"
          disabled={
            !status || mutation.isPending
          }
        >
          {mutation.isPending
            ? 'Updating...'
            : 'Update status'}
        </button>
      </form>
    </section>
  );
}