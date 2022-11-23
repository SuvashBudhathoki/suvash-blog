import { useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import TagManager from 'react-gtm-module';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }: Props) => {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-NX94PH5' });
  }, []);
  return (
    <>
      <div className='flex flex-col px-4 min-h-screen'>
        <Header />
        <div className='max-w-prose mx-auto px-4'>
          <main className='pt-4 pb-12'>{children}</main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
