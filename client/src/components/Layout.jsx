import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="container pb-5">{children}</main>
    </>
  );
};

export default Layout;

