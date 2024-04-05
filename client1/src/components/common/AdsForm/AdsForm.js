import style from './AdsForm.module.scss';
import { API_URL } from '../../../config';
import { useDispatch } from 'react-redux';
import { loadAdvertsRequest } from '../../../redux/advertsRedux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  
  const handleSubmit = (e) => {
    e.preventDefault();

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
          setTimeout(() => {
            if(ads._id){
              navigate(`/advert/${ads._id}`);
            } else {
              navigate('/');
            }
          }, 2000);
        } else if (res.status === 400){
          setStatus('clientError');
        } else {
          setStatus('serverError');
        }
      })
      .catch(() => {
        setStatus('serverError');
      });
  };

  
  return (
    
    <form className={style.form} onSubmit={handleSubmit}>
    <h2>{ads._id ? 'Edit' : 'New' } announcement</h2>
    
  <div className={style.info}>
    {status === 'success' && ( 
      <div className={style.success}>
        <h2>Success!</h2>
        <p>Your ad has been added</p>
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
      <div className={style.spinner}>
        <p>Loading...</p>
        <div className={style.bounce1}></div>
        <div className={style.bounce2}></div>
        <div className={style.bounce3}></div>
      </div>      
    )}
  </div>
    <div>
      <label>Title:</label>
      <input type="text" value={newTitle} onChange={e => setTitle(e.target.value)} placeholder='Title' />
    </div>
    <div>
      <label>Price:</label>
      <input type="text" value={newPrice} onChange={e => setPrice(e.target.value)} placeholder='Price' />
    </div>
    <div>
      <label>Location:</label>
      <input type="text" value={newLocation} onChange={e => setLocation(e.target.value)} placeholder='City' />
    </div>
    <div>
      <label>Image:</label>
      <input type='file' onChange={e => setImage(e.target.files[0])} />
    </div>
    <div>
      <label>Content:</label>
      <textarea value={newContent} onChange={e => setContent(e.target.value)} rows={8} placeholder='Type here about ads...'/>
    </div>
    <button type="submit">{ads._id ? 'Save' : 'Add'} announcement</button>
  </form>
  );
};

export default AdsForm;