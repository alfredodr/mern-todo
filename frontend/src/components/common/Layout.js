import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="bg-gray-100 mx-auto my-auto leading-7 overflow-x-hidden h-[calc(100vh-4rem)] pt-48">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
