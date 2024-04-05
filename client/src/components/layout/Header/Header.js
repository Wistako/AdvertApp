import { NavLink } from 'react-router-dom';
import style from './Header.module.scss';
import Container from '../../common/Container/Container';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/userRedux';
import SearchAdverts from '../../features/SearchAdverts/SearchAdverts';

const Header = () => {
  const user = useSelector(state => getUser(state));
  return (
    <header className={style.header}>
      <Container className={style.container}>
        <NavLink to='/'>Bulletin Board</NavLink>
        <SearchAdverts />
        <div>
          <NavLink to="/">Home</NavLink>
          { !user ? 
            <>
              <NavLink to="/login" >Sign in</NavLink>
              <NavLink to="/register" >Sign up</NavLink>
            </>
            :
            <NavLink to="/logout" >Sign out</NavLink>
          }
        </div>
      </Container>
    </header>
  );
};

export default Header;