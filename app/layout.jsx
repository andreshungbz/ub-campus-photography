import '@styles/globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Provider from '@components/Provider';

// fonts
const inter = Inter({
  subsets: ['latin'],
});
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const metadata = {
  title: 'UB Campus Photography',
  description: 'Share and showcase photographs of the University of Belize',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.className} ${jetbrains.variable}`}>
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
