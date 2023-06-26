// Web Application Common Layout

// tailwind css global styles and next.js Google variable fonts
import '@styles/globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';

import Header from '@components/Header';
import Footer from '@components/Footer';
import Provider from '@components/Provider';

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
  description: 'Share and showcase photographs of the University of Belize',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.className} ${jetbrains.variable}`}>
      {/* next-auth authentication Provider component to enable session site-wide */}
      <Provider>
        <body className="app">
          <Header />
          <main className="p-5">{children}</main>
          <Footer />
        </body>
      </Provider>
    </html>
  );
}
