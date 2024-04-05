import style from './Register.module.scss';
import { useState } from 'react';
import { API_URL } from '../../../config';
import Container from '../../common/Container/Container';

const Register = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [status, setStatus] = useState(null); // loading, success, serverError, clientError, loginError 

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    
    const fd = new FormData();
    fd.append('login', login);
    fd.append('password', password);
    fd.append('phone', phone);
    fd.append('avatar', avatar);
    
    const options = {
      method: 'POST',
      body: fd
    }

    fetch(`${API_URL}/auth/register`, options)
      .then(res => {
        if(res.status === 201){
          setStatus('success');
        } else if (res.status === 400){
          setStatus('clientError');
        } else if (res.status === 409){
          setStatus('loginError');
        } else {
          setStatus('serverError');
        }
      })
      .catch(() => {
        setStatus('serverError');
      });
    
  };

  return (
    <Container>
      <form onSubmit={handleSubmit} className={style.form}>
        <h1>Sign up</h1>
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
              <h2>No enough data</h2>
              <p>You have to fill all the fields</p>
            </div>
          )}
          {status === 'loginError' && (
            <div className={style.warning}>
              <h2>Login already in use</h2>
              <p>You have to use other login.</p>
            </div>
          )}
          {status === 'loading' && (
            <div className={style.spinner}>
              <p>Loading...</p>
              <div className={style.bounce1}></div>
              <div className={style.bounce2}></div>
              <div className={style.bounce3}></div>
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
        <div>
          <label htmlFor='phone'>Phone</label>
          <input type='tel' value={phone} onChange={e => setPhone(e.target.value)} id='phone' name='phone' placeholder='Tel' />
        </div>
        <div>
          <label htmlFor='avatar'>Avatar</label>
          <input type='file' id='avatar' name='avatar' onChange={e => setAvatar(e.target.files[0])} />
        </div>
        <button type="submit">Register</button>
      </form>
    </Container>
  );
};

export default Register;