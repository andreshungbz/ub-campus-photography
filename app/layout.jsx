// Web Application Common Layout

// tailwind css global styles and next.js Google variable fonts
import '@styles/globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';

import Footer from '@components/Footer';
import Header from '@components/Header';
import Provider from '@components/Provider';
import Loading from './loading';

import { Suspense } from 'react';

// main and secondary font definitions
const inter = Inter({
  subsets: ['latin'],
});
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  // define variable for use in tailwind css globally
  // https://nextjs.org/docs/app/building-your-application/optimizing/fonts#with-tailwind-css
  variable: '--font-jetbrains-mono',
});

// metadata
export const metadata = {
  title: 'UB Campus Photography',
  author: 'Andres Hung',
  keywords: ['University of Belize', 'Photography', 'Photo'],
  applicationName: 'UB Campus Photography',
  description: 'Share and showcase photographs of the University of Belize',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.className} ${jetbrains.variable}`}>
      {/* next-auth authentication Provider component to enable session site-wide */}
      <Provider>
        <body className="app">
          <Header />
          <Suspense fallback={<Loading />}>
            <main className="bg-ub-yellow-50 p-5">{children}</main>
          </Suspense>
          <Footer />
        </body>
      </Provider>
    </html>
  );
}
