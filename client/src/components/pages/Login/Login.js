import style from './Login.module.scss';
import Container from '../../common/Container/Container';
import { useState } from 'react';
import { API_URL } from '../../../config';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../redux/userRedux';
import { useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(''); // 'success', 'loading', 'serverError', 'clientError'

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, password }),
    }

    fetch(`${API_URL}/auth/login`, options)
      .then(res => {
        if (res.status === 200) {
          setStatus('success');
          res.json().then(res => dispatch(logIn(res.user)));
          setTimeout(() => {
            navigate('/');
          }, 2000);
          
        } else if (res.status === 400) {
          setStatus('clientError');
        } else {
          setStatus('serverError');
        }
      })
      .catch(err => setStatus('serverError'))
    
  };

  return (
    <Container>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className={style.form}>
        
        <div className={style.info}>
          {status === 'success' && ( 
            <div className={style.success}>
              <h2>Success!</h2>
              <p>Your account has been created successfully</p>
            </div>
          )}
          {status === 'serverError' && (
            <div className={style.danger}>
              <h2>Something went wrong..</h2>
              <p>Unexpected error... Try again!</p>
            </div>
          )}
          {status === 'clientError' && (
            <div className={style.danger}>
              <h2>Incorrect data</h2>
              <p>Login or password are incorrect...</p>
            </div>
          )}
          {status === 'loading' && (
            <div className={style.loading}>
              <Oval visible={true} height={80} width={80} color='#4fa94d' ariaLabel='oval-loading' />  
            </div>   
          )}
        </div>
        
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" value={login} onChange={e => setLogin(e.target.value)} id="username" name="username" placeholder='Username'/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} id="password" name="password" placeholder='Password'/>
        </div>
        <button type="submit">Sign in</button>
      </form>

    </Container>
  );
};

export default Login;