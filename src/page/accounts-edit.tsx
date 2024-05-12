import React from 'react';
import CommonLayout from '../components/layouts/common';
import FormCreateAccount from '../components/forms/create-account';
import { useParams } from 'react-router-dom';
import useUserQuery from '../hooks/queries/users/useUserQuery';

const AccountsEditPage = () => {
  const { id } = useParams();

  const { data, isLoading } = useUserQuery({
    id: Number(id),
  });

  const user = data?.data;
  return (
    <CommonLayout>
      <div className='max-w-2xl mx-auto bg-white rounded-lg shadow-lg '>
        <div className='p-6 !pb-0'>
          <h1 className='text-2xl font-bold'>Edit Account</h1>
        </div>
        {isLoading ? (
          <div className='p-3'>Loading...</div>
        ) : (
          <FormCreateAccount
            defaultValues={{
              email: user?.email,
              role: user?.roleId,
              name: user?.name,
              password: '',
            }}
          />
        )}
      </div>
    </CommonLayout>
  );
};

export default AccountsEditPage;
