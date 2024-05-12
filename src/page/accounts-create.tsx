import FormCreateAccount from '../components/forms/create-account';
import CommonLayout from '../components/layouts/common';

function AccountsCreatePage() {
  return (
    <CommonLayout>
      <div className='max-w-2xl mx-auto bg-white rounded-lg shadow-lg '>
        <div className='p-6 !pb-0'>
          <h1 className='text-2xl font-bold'>Create Account</h1>
        </div>
        <FormCreateAccount />
      </div>
    </CommonLayout>
  );
}

export default AccountsCreatePage;
