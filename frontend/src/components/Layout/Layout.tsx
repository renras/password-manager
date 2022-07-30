interface Props {
  children: JSX.Element[] | JSX.Element;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <header className="shadow-sm p-2">
        <div className="mw-xl w-100 m-auto">
          <h1>KEYS MANAGER</h1>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
