import type {
  ServiceRequestStatus,
} from '../types/request';

export const allowedStatusTransitions: Record<
  ServiceRequestStatus,
  ServiceRequestStatus[]
> = {
  OPEN: ['IN_PROGRESS', 'CLOSED'],

  IN_PROGRESS: ['RESOLVED', 'OPEN'],

  RESOLVED: ['CLOSED', 'IN_PROGRESS'],

  CLOSED: [],
};

export function getAllowedStatusTransitions(
  status: ServiceRequestStatus,
) {
  return allowedStatusTransitions[status];
}