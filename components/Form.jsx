// Form Component for Uploading Photos

'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

import { revalidate } from '@utils/revalidate';

const Form = () => {
  // create router for redirects https://nextjs.org/docs/app/api-reference/functions/use-router
  const router = useRouter();

  // state for title input
  const [title, setTitle] = useState('');
  // state for textarea input
  const [description, setDescription] = useState('');
  // state for error messages
  const [errorMessage, setErrorMessage] = useState(null);
  // state for submitting status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // reference to form
  const formRef = useRef(null);

  // get user session
  const { data: session } = useSession();

  // handler for populating FormData object and sending to /api/photo/new for upload
  // adapted from https://medium.com/@_hanglucas/file-upload-in-next-js-app-router-13-4-6d24f2e3d00f
  const handleInput = async (e) => {
    e.preventDefault();
    // prevent non-signed in users from submitting photos
    if (!session?.user.id) {
      setErrorMessage('You are not signed in');
      return;
    }
    setIsSubmitting(true);
    // create a FormData object with the input values
    const formData = new FormData(formRef.current);
    // pass in user id
    formData.append('userId', session?.user.id);
    try {
      // send data to route handler for upload
      const response = await fetch('/api/photo/new', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        // redirect to uploaded photo's page
        const data = await response.json();
        const id = data._id;
        // server action for ensuring latest data is refreshed on home and profile
        revalidate('/');
        revalidate('/profile/[id]');
        router.push(`/photo/${id}`);
      } else if (response.status === 400) {
        setErrorMessage(response.statusText);
      } else {
        setErrorMessage('Connection Timeout Error. Try Again');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <h1 className="title">Upload a Photo</h1>
      <form onSubmit={handleInput} ref={formRef} encType="multipart/form-data">
        <label>
          <div className="mx-auto my-2 w-full border-2 border-ub-purple-300 bg-ub-purple-100 p-3 sm:w-9/12">
            <input
              name="image"
              type="file"
              accept=".png,.jpg,.jpeg"
              disabled={isSubmitting}
              required
              className="file-input"
            />
          </div>
        </label>
        <label>
          <p className="text-center text-sm">Title</p>
          <textarea
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            disabled={isSubmitting}
            required
            className="text-input h-10"
          />
        </label>
        <label>
          <p className="text-center text-sm">Description</p>
          <textarea
            name="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            disabled={isSubmitting}
            required
            className="text-input h-32"
          />
        </label>
        <p className="my-3 text-center text-red-500">{errorMessage}</p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="primary-btn mx-auto block"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </section>
  );
};
export default Form;
