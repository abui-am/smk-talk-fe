import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginPage from './page/login';
import IndexPage from './page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AccountsPage from './page/accounts';
import AccountsCreatePage from './page/accounts-create';
import AccountsEditPage from './page/accounts-edit';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <IndexPage />,
  },
  {
    path: '/accounts',
    element: <AccountsPage />,
  },

  {
    path: '/accounts/create',
    element: <AccountsCreatePage />,
  },
  {
    path: '/accounts/:id/edit',
    element: <AccountsEditPage />,
  },
]);
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position='top-center' reverseOrder={false} />
      <RouterProvider router={router}></RouterProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
