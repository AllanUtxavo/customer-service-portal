import { Link } from 'react-router-dom';

import type { ServiceRequest } from '../types/request';

interface RequestTableProps {
  requests: ServiceRequest[];
}

export function RequestTable({
  requests,
}: RequestTableProps) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Requester</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Created</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>
                <Link to={`/requests/${request.id}`}>
                  {request.title}
                </Link>
              </td>

              <td>{request.requesterName}</td>

              <td>{request.category}</td>

              <td>{request.priority}</td>

              <td>{request.status}</td>

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