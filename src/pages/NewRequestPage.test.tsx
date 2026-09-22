import {
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  MemoryRouter,
  Route,
  Routes,
} from 'react-router-dom';
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { NewRequestPage } from './NewRequestPage';

const mutateMock = vi.fn();

vi.mock('../hooks/useCreateServiceRequest', () => ({
  useCreateServiceRequest: () => ({
    mutate: mutateMock,
    isPending: false,
    isError: false,
    error: null,
  }),
}));

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/requests/new']}>
      <Routes>
        <Route
          path="/requests/new"
          element={<NewRequestPage />}
        />
        <Route
          path="/requests/:requestId"
          element={<div>Request details</div>}
        />
      </Routes>
    </MemoryRouter>,
  );
}

describe('NewRequestPage', () => {
  beforeEach(() => {
    mutateMock.mockClear();
  });

  it('shows validation errors when required fields are invalid', async () => {
    const user = userEvent.setup();

    renderPage();

    await user.click(
      screen.getByRole('button', {
        name: /create request/i,
      }),
    );

    expect(mutateMock).not.toHaveBeenCalled();

    expect(
      await screen.findAllByRole('alert'),
    ).not.toHaveLength(0);
  });

  it('submits a valid service request', async () => {
    const user = userEvent.setup();

    renderPage();

    await user.type(
      screen.getByLabelText(/title/i),
      'Unable to access customer portal',
    );

    await user.type(
      screen.getByLabelText(/description/i),
      'The customer cannot access the portal with valid credentials.',
    );

    await user.type(
      screen.getByLabelText(/category/i),
      'Access',
    );

    await user.selectOptions(
      screen.getByLabelText(/priority/i),
      'HIGH',
    );

    await user.type(
      screen.getByLabelText(/requester name/i),
      'Example Customer',
    );

    await user.type(
      screen.getByLabelText(/requester email/i),
      'customer@example.com',
    );

    await user.click(
      screen.getByRole('button', {
        name: /create request/i,
      }),
    );

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledTimes(1);
    });

    expect(mutateMock).toHaveBeenCalledWith(
      {
        title: 'Unable to access customer portal',
        description:
          'The customer cannot access the portal with valid credentials.',
        category: 'Access',
        priority: 'HIGH',
        requesterName: 'Example Customer',
        requesterEmail: 'customer@example.com',
      },
      expect.objectContaining({
        onSuccess: expect.any(Function),
      }),
    );
  });
});