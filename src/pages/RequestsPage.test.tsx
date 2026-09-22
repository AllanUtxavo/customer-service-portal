import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { RequestsPage } from './RequestsPage';
import { useServiceRequests } from '../hooks/useServiceRequests';

vi.mock('../hooks/useServiceRequests', () => ({
  useServiceRequests: vi.fn(),
}));

const mockedUseServiceRequests = vi.mocked(useServiceRequests);

const requests = [
  {
    id: 'req-1',
    title: 'Unable to access account',
    description: 'Customer cannot access the account.',
    category: 'Account',
    priority: 'HIGH' as const,
    status: 'OPEN' as const,
    requesterName: 'Alice Customer',
    requesterEmail: 'alice@example.com',
    createdAt: '2026-09-21T10:00:00.000Z',
    updatedAt: '2026-09-21T10:00:00.000Z',
    version: 1,
  },
];

describe('RequestsPage', () => {
  it('renders service requests returned by the API hook', () => {
    mockedUseServiceRequests.mockReturnValue({
      data: {
        items: requests,
        page: 1,
        pageSize: 5,
        total: 1,
        totalPages: 1,
      },
      isLoading: false,
      isError: false,
      error: null,
    } as ReturnType<typeof useServiceRequests>);

    render(
      <MemoryRouter>
        <RequestsPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', {
        name: /service requests/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Unable to access account'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Alice Customer'),
    ).toBeInTheDocument();
  });

  it('passes the search value to the requests hook', async () => {
    const user = userEvent.setup();

    mockedUseServiceRequests.mockReturnValue({
      data: {
        items: requests,
        page: 1,
        pageSize: 5,
        total: 1,
        totalPages: 1,
      },
      isLoading: false,
      isError: false,
      error: null,
    } as ReturnType<typeof useServiceRequests>);

    render(
      <MemoryRouter>
        <RequestsPage />
      </MemoryRouter>,
    );

    await user.type(
      screen.getByRole('searchbox', {
        name: /search service requests/i,
      }),
      'Alice',
    );

    expect(mockedUseServiceRequests).toHaveBeenLastCalledWith(
      expect.objectContaining({
        search: 'Alice',
        page: 1,
      }),
    );
  });
});