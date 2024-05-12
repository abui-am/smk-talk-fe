import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../../../helpers';
import { BackendRes } from '../../../types/common';

export interface User {
  id: number;
  roleName: string;
  nip: string;
  email: string;
  roleId: number;
  name: string;
}

function useUserQuery({ id }: { id?: number }) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: async () => {
      const response = await fetchData<BackendRes<User>>({
        method: 'GET',
        url: '/v1/users/' + id?.toString(),
      });

      return response;
    },
    enabled: !!id,
  });
}

export default useUserQuery;
