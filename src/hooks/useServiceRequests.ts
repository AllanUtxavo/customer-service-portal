import { useQuery } from '@tanstack/react-query';

import { listServiceRequests } from '../api/requests';
import type { ListServiceRequestsParams } from '../types/request';

export function useServiceRequests(
  params: ListServiceRequestsParams,
) {
  return useQuery({
    queryKey: ['service-requests', params],
    queryFn: () => listServiceRequests(params),
  });
}