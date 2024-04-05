import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config';
import { useDispatch } from 'react-redux';
import { deleteAdvert } from '../../../redux/advertsRedux';
import { useEffect } from 'react';

const DeleteAds = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: 'DELETE',
      Credential: 'include',
    }

    fetch(`${API_URL}/api/ads/${id}`, options)
      .then((res) => {
          dispatch(deleteAdvert({id}));
          navigate('/');
      });   
  });

  return null;
}

export default DeleteAds;