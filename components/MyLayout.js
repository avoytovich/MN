import Header from './header/header';
import Footer from 'components/footer';

import './MyLayout.sass';

const Layout = props => (
  <div>
    <Header />
      <div className='general-wrapper'>
        {props.children}
      </div>
    <Footer />
  </div>
);

export default Layout;
