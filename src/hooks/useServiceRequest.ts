import { useQuery } from '@tanstack/react-query';

import { getServiceRequest } from '../api/requests';

export function useServiceRequest(
  requestId: string | undefined,
) {
  return useQuery({
    queryKey: ['service-request', requestId],
    queryFn: () => getServiceRequest(requestId!),
    enabled: Boolean(requestId),
  });
}