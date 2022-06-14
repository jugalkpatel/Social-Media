import { Navbar } from 'components';

type Props = {
  children: JSX.Element | JSX.Element[];
};

function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export { Layout };
