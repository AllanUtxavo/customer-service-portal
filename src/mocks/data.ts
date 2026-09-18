import type { ServiceRequest } from '../types/request';

export const serviceRequests: ServiceRequest[] = [
  {
    id: 'req-001',
    title: 'Unable to access customer portal',
    description:
      'The customer is unable to sign in to the portal using their account.',
    category: 'Access',
    priority: 'HIGH',
    status: 'OPEN',
    requesterName: 'John Doe',
    requesterEmail: 'john.doe@example.com',
    createdAt: '2026-09-15T08:30:00Z',
    updatedAt: '2026-09-15T08:30:00Z',
    version: 1,
  },
  {
    id: 'req-002',
    title: 'Incorrect invoice amount',
    description:
      'The customer reports that the latest invoice contains an incorrect amount.',
    category: 'Billing',
    priority: 'CRITICAL',
    status: 'IN_PROGRESS',
    requesterName: 'Maria Silva',
    requesterEmail: 'maria.silva@example.com',
    createdAt: '2026-09-14T10:15:00Z',
    updatedAt: '2026-09-15T09:20:00Z',
    version: 2,
  },
  {
    id: 'req-003',
    title: 'Request account information update',
    description:
      'The customer would like to update the contact information associated with the account.',
    category: 'Account',
    priority: 'MEDIUM',
    status: 'RESOLVED',
    requesterName: 'Peter Smith',
    requesterEmail: 'peter.smith@example.com',
    createdAt: '2026-09-13T14:00:00Z',
    updatedAt: '2026-09-14T11:30:00Z',
    version: 3,
  },
  {
    id: 'req-004',
    title: 'Password reset assistance',
    description:
      'The customer requires assistance resetting the password for the online portal.',
    category: 'Access',
    priority: 'LOW',
    status: 'CLOSED',
    requesterName: 'Ana Manuel',
    requesterEmail: 'ana.manuel@example.com',
    createdAt: '2026-09-12T07:45:00Z',
    updatedAt: '2026-09-13T08:10:00Z',
    version: 2,
  },
];