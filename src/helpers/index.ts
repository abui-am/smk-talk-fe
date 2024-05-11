import Cookies from 'js-cookie';
import { TOKEN_KEY } from '../configs/constants';

export function cx(...args: unknown[]) {
  return args
    .flat()
    .filter((x) => typeof x === 'string')
    .join(' ')
    .trim();
}

export async function fetchData<T, P>({
  method,
  url,
  data,
}: {
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  url: string;
  data: T;
}): Promise<P> {
  const response = await fetch(import.meta.env.VITE_BASE_API_URL + url, {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get(TOKEN_KEY)}`,
    },
  });
  return response.json();
}
