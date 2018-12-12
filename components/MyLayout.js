import Footer from 'components/footer';
import Header from './header/header';

const Layout = props => (
  <div>
    <Header />
    {props.children}
    <Footer />
  </div>
);

export default Layout;
