import { useForm } from 'react-hook-form';
import Input from '../common/input';
import toast from 'react-hot-toast';
import Button from '../common/button';
import useRegisterUserMutation from '../../hooks/mutations/users/useRegisterUserMutation';
import { useNavigate } from 'react-router-dom';
interface FormValue {
  email: string;
  password: string;
  role: number;
  name: string;
}

function FormCreateAccount({
  defaultValues,
}: {
  defaultValues?: Partial<FormValue>;
}) {
  const { register, handleSubmit, reset } = useForm<FormValue>({
    defaultValues,
  });
  const navigate = useNavigate();
  const { mutateAsync: registerUser } = useRegisterUserMutation();
  async function onSubmit(data: FormValue) {
    console.log(data);
    try {
      await registerUser({
        email: data.email,
        password: data.password,
        roleId: +data.role,
        name: data.name,
      });
      reset();
      toast.success('Berhasil membuat akun');
      navigate('/accounts');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='bg-white p-6'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className='mb-3'>
            <span className='block mb-2 text-left'>
              Name<span className='text-red-600'>*</span>
            </span>
            <Input placeholder='Masukan nama' {...register('name')} />
          </div>

          <div className='mb-3'>
            <span className='block mb-2 text-left'>
              Email<span className='text-red-600'>*</span>
            </span>
            <Input placeholder='Masukan email' {...register('email')} />
          </div>
          <div className='mb-3'>
            <span className='block mb-2 text-left'>
              Password<span className='text-red-600'>*</span>
            </span>
            <Input
              placeholder='Masukan password'
              type='password'
              {...register('password')}
            />
          </div>
          <div className='mb-3'>
            <span className='block mb-2 text-left'>
              Role<span className='text-red-600'>*</span>
            </span>
            <div className='w-full'>
              <select {...register('role')}>
                <option value={1}>Manager</option>
                <option value={3}>Operator</option>
              </select>
            </div>
          </div>

          <Button type='submit' className='mt-6'>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default FormCreateAccount;
