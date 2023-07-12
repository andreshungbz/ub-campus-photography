// Server Action for Clearing Client-side Cache
// temporary fix https://github.com/vercel/next.js/issues/42991#issuecomment-1615836329

'use server';

import { revalidatePath } from 'next/cache';

export const revalidate = (path) => {
  revalidatePath(path);
};
