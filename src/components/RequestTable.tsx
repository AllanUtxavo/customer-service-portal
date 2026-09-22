import { Link } from 'react-router-dom';

import type { ServiceRequest } from '../types/request';

interface RequestTableProps {
  requests: ServiceRequest[];
}

function formatLabel(value: string) {
  return value.replaceAll('_', ' ');
}

export function RequestTable({
  requests,
}: RequestTableProps) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Requester</th>
            <th scope="col">Category</th>
            <th scope="col">Priority</th>
            <th scope="col">Status</th>
            <th scope="col">Created</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>
                <Link
                  className="request-title"
                  to={`/requests/${request.id}`}
                >
                  {request.title}
                </Link>
              </td>

              <td>{request.requesterName}</td>

              <td>{request.category}</td>

              <td>
                <span
                  className={`badge priority-${request.priority
                    .toLowerCase()
                    .replace('_', '-')}`}
                >
                  {formatLabel(request.priority)}
                </span>
              </td>

              <td>
                <span
                  className={`badge status-${request.status
                    .toLowerCase()
                    .replace('_', '-')}`}
                >
                  {formatLabel(request.status)}
                </span>
              </td>

              <td>
                {new Date(
                  request.createdAt,
                ).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}