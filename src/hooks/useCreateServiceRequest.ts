import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { createServiceRequest } from '../api/requests';

export function useCreateServiceRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createServiceRequest,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['service-requests'],
      });
    },
  });
}