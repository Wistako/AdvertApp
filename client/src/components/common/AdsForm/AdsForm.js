import style from './AdsForm.module.scss';
import { API_URL } from '../../../config';
import { useDispatch } from 'react-redux';
import { loadAdvertsRequest } from '../../../redux/advertsRedux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import { useForm } from 'react-hook-form';

const AdsForm = ({ads}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if(!ads) ads = {};
  const { title, content, price, location, image } = ads
  const [newTitle, setTitle] = useState(title || '');
  const [newContent, setContent] = useState(content || '');
  const [newPrice, setPrice] = useState(price || '');
  const [newLocation, setLocation] = useState(location || '');
  const [newImage, setImage] = useState(image || '');
  const [status, setStatus] = useState(null); // loading, success, serverError, clientError, loginError
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = () => {
    setStatus('loading');

    const fd = new FormData();
    fd.append('title', newTitle);
    fd.append('content', newContent);
    fd.append('price', newPrice);
    fd.append('location', newLocation);
    fd.append('image', newImage);

    const options = {
      Credential: 'include',
      body: fd
    }

    const url = ads._id ? `${API_URL}/api/ads/${ads._id}` : `${API_URL}/api/ads`;

    if(ads._id){
      options.method = 'PUT';
    } else {
      options.method = 'POST';
    }

    fetch(url, options)
      .then(res => {
        if(res.status === 201 || res.status === 200){
          setStatus('success');
          dispatch(loadAdvertsRequest());
        } else if (res.status === 400){
          setStatus('clientError');
        } else {
          setStatus('serverError');
        }
      })
      .then(() => {
        if(ads._id){
          navigate(`/advert/${ads._id}`);
        } else {
          navigate('/');
        }
      })
      .catch(() => {
        setStatus('serverError');
      });
  };

  
  return (
    
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <h2>{ads._id ? 'Edit' : 'New' } announcement</h2>
      <div className={style.info}>
        {status === 'success' && ( 
          <div className={style.success}>
            <h2>Success!</h2>
            <p>Your ad has been { !ads._id ? 'added' : 'edited'}</p>
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
        {status === 'loading' && (
          <div className={style.loading}>
            <Oval visible={true} height={80} width={80} color='#4fa94d' ariaLabel='oval-loading' />  
          </div>
        )}
      </div>
      <div>
        <label>Title:</label>
        <input 
          {...register('title', {required: true, minLength: 10, maxLength: 50})} 
          type="text"
          value={newTitle} 
          onChange={e => setTitle(e.target.value)} 
          placeholder='Title' 
        />
        {errors.title && <p className={style.error}>Title must be between 10 and 50 characters</p>}
      </div>
      <div>
        <label>Price:</label>
        <input 
          {...register('price', {required: true, min: 0})}
          type="number" 
          value={newPrice} 
          onChange={e => setPrice(e.target.value)} 
          placeholder='Price' 
        />
        {errors.price && <p className={style.error}>Price must be a number</p>}
      </div>
      <div>
        <label>Location:</label>
        <input 
          {...register('location', {required: true})}
          type="text" 
          value={newLocation} 
          onChange={e => setLocation(e.target.value)} 
          placeholder='City' 
        />
        {errors.location && <p className={style.error}>Location is required</p>}
      </div>
      <div>
        <label>Image:</label>
        <input 
          type='file' 
          onChange={e => setImage(e.target.files[0])} 
        />
      </div>
      <div>
        <label>Content:</label>
        <textarea 
          {...register('content', {required: true, minLength: 20, maxLength: 1000})}
          value={newContent} 
          onChange={e => setContent(e.target.value)} 
          rows={8} 
          placeholder='Type here about ads...'
        />
        {errors.content && <p className={style.error}>Content must be between 20 and 1000 characters</p>}
      </div>
      <button type="submit">{ads._id ? 'Save' : 'Add'} announcement</button>
    </form>
  );
};

export default AdsForm;