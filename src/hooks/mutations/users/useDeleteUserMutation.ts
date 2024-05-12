import { useMutation } from '@tanstack/react-query';
import { fetchData } from '../../../helpers';
import { BackendRes } from '../../../types/common';

function useDeleteUserMutation() {
  return useMutation({
    mutationFn: async (id: number) => {
      // Make a POST request
      const response = await fetchData<
        BackendRes<{
          id: number;
          roleName: string;
          nip: string;
          email: string;
          roleId: number;
          name: string;
        }>
      >({
        method: 'DELETE',
        url: '/v1/users/' + id,
      });

      return response;
    },
  });
}

export default useDeleteUserMutation;
