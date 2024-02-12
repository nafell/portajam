import { getTagList } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import './globals.css';
import styles from './layout.module.css';
import { Noto_Sans_JP, Source_Code_Pro } from 'next/font/google';

const noto_sans_jp = Noto_Sans_JP({ subsets: ['latin'] });
const source_code_pro = Source_Code_Pro({ subsets: ['latin'], variable: '--code-font' });

export const metadata = {
  metadataBase: new URL(process.env.BASE_URL || 'http://localhost:14555'),
  title: "nafell's devlog",
  description: 'Development blog owned by nafell.',
  openGraph: {
    title: "nafell's devlog",
    description: 'Development blog owned by nafell.',
    images: '/ogp.png',
  },
  alternates: {
    canonical: '/',
  },
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const tags = await getTagList({
    limit: LIMIT,
  });
  return (
    <html lang="ja">
      <body>
        <Header />
        <Nav tags={tags.contents} />
        <main className={`${styles.main} ${noto_sans_jp.className} ${source_code_pro.variable}`}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
