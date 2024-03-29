import { Link } from "react-router-dom";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <header className="shadow-sm py-2 px-4">
        <div className="mw-xl w-100 m-auto d-flex align-items-center">
          <Link to="/" className="h1 text-dark text-decoration-none">
            KEYS MANAGER
          </Link>
          <Link to="/login" className="ms-auto btn btn-primary">
            Login
          </Link>
        </div>
      </header>
      <main className="mw-xl w-100 m-auto">{children}</main>
    </>
  );
};

export default Layout;
