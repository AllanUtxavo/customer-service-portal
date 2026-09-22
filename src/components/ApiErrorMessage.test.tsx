import {
  render,
  screen,
} from '@testing-library/react';
import axios from 'axios';
import {
  describe,
  expect,
  it,
} from 'vitest';

import { ApiErrorMessage } from './ApiErrorMessage';

describe('ApiErrorMessage', () => {
  it('renders a 409 version conflict error', () => {
    const error = new axios.AxiosError(
      'Request failed',
      'ERR_BAD_REQUEST',
      undefined,
      undefined,
      {
        status: 409,
        statusText: 'Conflict',
        headers: {},
        config: {
          headers: new axios.AxiosHeaders(),
        },
        data: {
          type: 'https://api.example.test/problems/version-conflict',
          title: 'Update conflict',
          status: 409,
          detail:
            'The request was updated by someone else. Refresh and try again.',
          traceId: 'test-trace-id',
        },
      },
    );

    render(<ApiErrorMessage error={error} />);

    expect(
      screen.getByText('Update conflict'),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /updated by someone else/i,
      ),
    ).toBeInTheDocument();
  });

  it('renders field validation messages from a 422 response', () => {
    const error = new axios.AxiosError(
      'Request failed',
      'ERR_BAD_REQUEST',
      undefined,
      undefined,
      {
        status: 422,
        statusText: 'Unprocessable Entity',
        headers: {},
        config: {
          headers: new axios.AxiosHeaders(),
        },
        data: {
          type: 'https://api.example.test/problems/validation-error',
          title: 'Validation failed',
          status: 422,
          detail:
            'The submitted service request contains invalid fields.',
          errors: {
            title: [
              'Title must be at least 3 characters long.',
            ],
            requesterEmail: [
              'Enter a valid email address.',
            ],
          },
        },
      },
    );

    render(<ApiErrorMessage error={error} />);

    expect(
      screen.getByText('Validation failed'),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'Title must be at least 3 characters long.',
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'Enter a valid email address.',
      ),
    ).toBeInTheDocument();
  });

  it('renders a connection error when no API response is available', () => {
    const error = new axios.AxiosError(
      'Network Error',
      'ERR_NETWORK',
    );

    render(<ApiErrorMessage error={error} />);

    expect(
      screen.getByText('Connection error'),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /unable to communicate with the server/i,
      ),
    ).toBeInTheDocument();
  });
});