interface Props {
  children: JSX.Element[] | JSX.Element;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <header>This is header</header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
