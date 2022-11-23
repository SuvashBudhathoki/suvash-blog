import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <div className='p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800"'>
      <header className='py-2'>
        <Link href='/'>
          <a className='text-2xl font-bold'>Home</a>
        </Link>
      </header>
    </div>
  );
};

export default Header;
