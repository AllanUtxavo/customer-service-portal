import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { updateServiceRequestStatus } from '../api/requests';

import type {
  UpdateServiceRequestStatus,
} from '../types/request';

interface UpdateStatusVariables {
  requestId: string;
  data: UpdateServiceRequestStatus;
}

export function useUpdateRequestStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      requestId,
      data,
    }: UpdateStatusVariables) =>
      updateServiceRequestStatus(
        requestId,
        data,
      ),

    onSuccess: async (updatedRequest) => {
      queryClient.setQueryData(
        [
          'service-request',
          updatedRequest.id,
        ],
        updatedRequest,
      );

      await queryClient.invalidateQueries({
        queryKey: ['service-requests'],
      });
    },
  });
}