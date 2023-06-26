// Form Component for Uploading Photos

'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';

const Form = () => {
  // create router https://nextjs.org/docs/app/api-reference/functions/use-router
  const router = useRouter();

  // state for textarea input
  const [description, setDescription] = useState('');

  // reference to form
  const formRef = useRef(null);

  // handler for populating FormData object and sending to /api/photos/new for upload
  // adapted from https://medium.com/@_hanglucas/file-upload-in-next-js-app-router-13-4-6d24f2e3d00f
  const handleInput = async (e) => {
    e.preventDefault();
    // create a FormData object with the input values
    const formData = new FormData(formRef.current);
    try {
      // send data to route handler for upload
      let response = await fetch('/api/photos/new', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        // redirect to home page
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <h1>Upload a Photo</h1>
      <form onSubmit={handleInput} ref={formRef}>
        <label className="block">
          <input name="photo" type="file" />
        </label>
        <label className="block">
          <textarea
            name="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </label>
        <button type="submit" className="primary-btn block">
          Submit
        </button>
      </form>
    </section>
  );
};
export default Form;
