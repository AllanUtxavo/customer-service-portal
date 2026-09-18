import axios from 'axios';

import type {
  ProblemDetails,
  ValidationProblemDetails,
} from '../types/request';

export interface AppApiError {
  status?: number;
  title: string;
  detail?: string;
  validationErrors?: Record<string, string[]>;
}

export function getApiError(
  error: unknown,
): AppApiError {
  if (!axios.isAxiosError(error)) {
    return {
      title: 'Unexpected error',
      detail:
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred.',
    };
  }

  if (!error.response) {
    return {
      title: 'Connection error',
      detail:
        'Unable to communicate with the server. Please try again.',
    };
  }

  const data = error.response.data as
    | ProblemDetails
    | ValidationProblemDetails
    | undefined;

  return {
    status: error.response.status,

    title:
      data?.title ??
      'Request failed',

    detail:
      data?.detail ??
      'The request could not be completed.',

    validationErrors:
      'errors' in (data ?? {})
        ? (data as ValidationProblemDetails).errors
        : undefined,
  };
}