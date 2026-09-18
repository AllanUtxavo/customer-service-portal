export type ServiceRequestStatus =
  | 'OPEN'
  | 'IN_PROGRESS'
  | 'RESOLVED'
  | 'CLOSED';

export type ServiceRequestPriority =
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH'
  | 'CRITICAL';

export interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: ServiceRequestPriority;
  status: ServiceRequestStatus;
  requesterName: string;
  requesterEmail: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface CreateServiceRequest {
  title: string;
  description: string;
  category: string;
  priority: ServiceRequestPriority;
  requesterName: string;
  requesterEmail: string;
}

export interface UpdateServiceRequestStatus {
  status: ServiceRequestStatus;
  version: number;
  note?: string;
}

export interface ServiceRequestPage {
  items: ServiceRequest[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ListServiceRequestsParams {
  search?: string;
  status?: ServiceRequestStatus;
  priority?: ServiceRequestPriority;
  sort?: 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt' | 'priority' | '-priority';
  page?: number;
  pageSize?: number;
}

export interface ProblemDetails {
  type?: string;
  title: string;
  status: number;
  detail?: string;
  instance?: string;
  traceId?: string;
}

export interface ValidationProblemDetails extends ProblemDetails {
  errors?: Record<string, string[]>;
}