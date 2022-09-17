import Footer from './Footer';
import Header from './Header';
import { ScrollToTop } from './ScrollToTop';

type Props = {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }: Props) => {
    return (
        <div className='flex flex-col px-4 min-h-screen'>
            <ScrollToTop />
            <Header />
            <div className="max-w-prose mx-auto px-4">
                <main className="pt-4 pb-12">{children}</main>
            </div>
            <Footer />
        </div>
    )
}

export default Layout