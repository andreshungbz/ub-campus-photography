// Photo Component for Displaying Single Photo and its Details

'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { revalidate } from '@utils/revalidate';

const Delete = ({ photoData }) => {
  // retrieve user
  const { data: session } = useSession();

  // navigation router
  const router = useRouter();

  const photo = JSON.parse(photoData);

  // function for deleting photo
  const handleDelete = async (id) => {
    const confirmation = confirm('Are you sure you want to delete this photo?');
    if (confirmation) {
      try {
        await fetch(`/api/photo/${id}`, { method: 'DELETE' });
        // server action for ensuring latest data is refreshed
        revalidate('/');
        revalidate('/profile/[id]');
        router.push('/');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      {session?.user.id &&
        photo?.uploader?._id &&
        session?.user?.id === photo?.uploader?._id && (
          <div className="mt-2 text-center">
            <button
              type="button"
              className="delete-btn"
              onClick={() => {
                handleDelete(photo._id);
              }}
            >
              Delete
            </button>
          </div>
        )}
    </div>
  );
};
export default Delete;
