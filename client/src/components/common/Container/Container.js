import style from './Container.module.scss';

const Container = ({ children, className }) => (
  <div className={`${style.container} ${className}`}>
    {children}
  </div>
);

export default Container;