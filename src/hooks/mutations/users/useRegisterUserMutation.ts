import { useMutation } from '@tanstack/react-query';
import { fetchData } from '../../../helpers';
import { BackendRes } from '../../../types/common';

function useRegisterUserMutation() {
  return useMutation({
    mutationFn: async (data: {
      email: string;
      password: string;
      roleId: number;
      name: string;
    }) => {
      // Make a POST request
      const response = await fetchData<
        BackendRes<{
          id: number;
          roleName: string;
          nip: string;
          email: string;
          roleId: number;
          name: string;
        }>,
        typeof data
      >({
        data,
        method: 'POST',
        url: '/v1/users',
      });

      return response;
    },
  });
}

export default useRegisterUserMutation;
