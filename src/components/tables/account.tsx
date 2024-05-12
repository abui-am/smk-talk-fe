import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import useUserListQuery, {
  User,
} from '../../hooks/queries/users/useUserListQuery';
import { Link } from 'react-router-dom';
import Button from '../common/button';
import { useState } from 'react';
import ReactModal from 'react-modal';
import useDeleteUserMutation from '../../hooks/mutations/users/useDeleteUserMutation';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor('name', {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    header: 'Name',
  }),
  columnHelper.accessor('email', {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    header: 'Email',
  }),
  columnHelper.accessor('roleName', {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    header: 'Role',
  }),
  columnHelper.display({
    header: 'Action',
    cell: (info) => {
      return <Action id={info.row.original.id} />;
    },
  }),
];

function Action({ id }: { id: number }) {
  const [isOpenDeleteConfirmation, setIsOpenDeleteConfirmation] =
    useState<boolean>(false);
  const { mutateAsync: deleteUser } = useDeleteUserMutation();
  const queryClient = useQueryClient();
  async function handleDelete() {
    try {
      await deleteUser(id);
      setIsOpenDeleteConfirmation(false);
      toast.success('Berhasil menghapus user');
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
    } catch (error) {
      console.log(error);
      toast.error('Gagal menghapus user');
    }
  }
  return (
    <>
      {isOpenDeleteConfirmation && (
        <ReactModal
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
            },
            content: {
              width: '400px',
              margin: 'auto',
              borderRadius: '8px',
              border: 'none',
              padding: '0',
              height: 'fit-content',
            },
          }}
          isOpen={isOpenDeleteConfirmation}
        >
          <div className='bg-white p-6'>
            <h2 className='mb-4'>
              Apakah anda yakin ingin menghapus user ini?
            </h2>
            <div className='flex justify-end gap-4'>
              <Button onClick={() => setIsOpenDeleteConfirmation(false)}>
                Cancel
              </Button>
              <Button onClick={handleDelete}>Delete</Button>
            </div>
          </div>
        </ReactModal>
      )}
      <div className='flex justify-center gap-4'>
        <Link to={`/accounts/${id}/edit`}>
          <Button className='!p-2 !text-sm'>Edit</Button>
        </Link>
        <Button
          className='!p-2  !text-sm'
          onClick={() => setIsOpenDeleteConfirmation(true)}
        >
          Delete
        </Button>
      </div>
    </>
  );
}
function TableAccount() {
  const { data: users } = useUserListQuery();

  const data = users?.data ?? [];
  const table = useReactTable<User>({
    getCoreRowModel: getCoreRowModel(),
    columns: columns,
    data,
  });

  return (
    <div>
      <table className='w-full table-auto bg-white shadow-lg'>
        <thead className='border-b'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className='p-3'>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className='even:bg-neutral-50'>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className='p-5'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableAccount;
