import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { StatusUpdateForm } from './StatusUpdateForm';
import type { ServiceRequest } from '../types/request';

vi.mock('../hooks/useUpdateRequestStatus', () => ({
  useUpdateRequestStatus: () => ({
    mutate: vi.fn(),
    isPending: false,
    isError: false,
    isSuccess: false,
    error: null,
  }),
}));

const baseRequest: ServiceRequest = {
  id: 'req-test',
  title: 'Test request',
  description: 'Test description',
  category: 'Technical Support',
  priority: 'HIGH',
  status: 'OPEN',
  requesterName: 'Test User',
  requesterEmail: 'test@example.com',
  createdAt: '2026-09-21T10:00:00.000Z',
  updatedAt: '2026-09-21T10:00:00.000Z',
  version: 1,
};

describe('StatusUpdateForm', () => {
  it('shows the valid transitions for an OPEN request', () => {
    render(<StatusUpdateForm request={baseRequest} />);

    expect(
      screen.getByRole('option', { name: 'IN PROGRESS' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('option', { name: 'CLOSED' }),
    ).toBeInTheDocument();
  });

  it('does not allow updates when the request is CLOSED', () => {
    render(
      <StatusUpdateForm
        request={{
          ...baseRequest,
          status: 'CLOSED',
        }}
      />,
    );

    expect(
      screen.getByText(
        /this request is closed and cannot transition/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('button', { name: /update status/i }),
    ).not.toBeInTheDocument();
  });
});