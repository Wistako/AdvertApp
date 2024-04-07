import style from './Register.module.scss';
import { useState } from 'react';
import { API_URL } from '../../../config';
import Container from '../../common/Container/Container';
import { Oval } from 'react-loader-spinner';
import { useForm } from 'react-hook-form';

const Register = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [status, setStatus] = useState(null); // loading, success, serverError, clientError, loginError 

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (e) => {
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
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
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
            <div className={style.loading}>
              <Oval visible={true} height={80} width={80} color='#4fa94d' ariaLabel='oval-loading' />  
            </div>  
          )}
        </div>

        <div>
          <label htmlFor="username">Username</label>
          <input
            {...register('username', { required: true, minLength: 5, maxLength: 20})}
            type="text" 
            value={login} 
            onChange={e => setLogin(e.target.value)} 
            id="username" 
            name="username" 
            placeholder='Username'
          />
          {errors.username && <p className={style.error}>Username must be between 5 and 20 characters</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input 
            {...register('password', { required: true, minLength: 5, maxLength: 20})}
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            id="password" 
            name="password" 
            placeholder='Password'
          />
          {errors.password && <p className={style.error}>Password must be between 5 and 20 characters</p>}
        </div>
        <div>
          <label htmlFor='phone'>Phone</label>
          <input 
            {...register('phone', { required: true, minLength: 9, maxLength: 9})}
            type='tel' 
            value={phone} 
            onChange={e => setPhone(e.target.value)} 
            id='phone' 
            name='phone' 
            placeholder='Tel' 
          />
          {errors.phone && <p className={style.error}>Phone must have 9 digits</p>}
        </div>
        <div>
          <label htmlFor='avatar'>Avatar</label>
          <input 
            {...register('avatar', { required: true})}
            type='file' 
            id='avatar' 
            name='avatar' 
            onChange={e => setAvatar(e.target.files[0])} 
          />
          {errors.avatar && <p className={style.error}>Avatar is required</p>}
        </div>
        <button type="submit">Register</button>
      </form>
    </Container>
  );
};

export default Register;