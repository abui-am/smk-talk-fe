import { useMutation } from '@tanstack/react-query';

import { fetchData } from '../../../helpers';
import { BackendRes } from '../../../types/common';

const useSignInMutation = () => {
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      // Make a POST request
      const response = await fetchData<
        typeof data,
        BackendRes<{ token: string; nip: string; name: string; id: string }>
      >({
        data,
        method: 'POST',
        url: '/v1/users/auth',
      });

      return response;
    },
  });
};

export default useSignInMutation;
