import style from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={style.footer}>
      <small>&copy; Advert App {new Date().getFullYear()}</small>
    </footer>
  );
};

export default Footer;