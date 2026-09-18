import { apiClient } from './client';

import type {
  CreateServiceRequest,
  ListServiceRequestsParams,
  ServiceRequest,
  ServiceRequestPage,
  UpdateServiceRequestStatus,
} from '../types/request';

export async function listServiceRequests(
  params?: ListServiceRequestsParams,
): Promise<ServiceRequestPage> {
  const response = await apiClient.get<ServiceRequestPage>('/requests', {
    params,
  });

  return response.data;
}

export async function getServiceRequest(
  requestId: string,
): Promise<ServiceRequest> {
  const response = await apiClient.get<ServiceRequest>(
    `/requests/${requestId}`,
  );

  return response.data;
}

export async function createServiceRequest(
  data: CreateServiceRequest,
): Promise<ServiceRequest> {
  const response = await apiClient.post<ServiceRequest>(
    '/requests',
    data,
  );

  return response.data;
}

export async function updateServiceRequestStatus(
  requestId: string,
  data: UpdateServiceRequestStatus,
): Promise<ServiceRequest> {
  const response = await apiClient.patch<ServiceRequest>(
    `/requests/${requestId}/status`,
    data,
  );

  return response.data;
}