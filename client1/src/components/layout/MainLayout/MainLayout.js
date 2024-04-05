import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import style from './MainLayout.module.scss';

const MainLayout = ({ children }) => (
  <div className={style.mainLayout}>
    <Header />
    <div className={style.content}>{children}</div>
    <Footer />
  </div>
);

export default MainLayout;