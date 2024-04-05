import style from './SearchResult.module.scss';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getRequest, getSearchResult, searchAdvert, searchAdvertRequest } from '../../../redux/advertsRedux';
import Container from '../../common/Container/Container';
import { Navigate } from 'react-router-dom';
import AdsCard from '../../common/AdsCard/AdsCard';

const SearchResult = () => {
  const { searchPhrase } = useParams();
  const dispatch = useDispatch();
  const request = useSelector(state => getRequest(state));
  const result = useSelector(state => getSearchResult(state));
  
  useEffect(() => {
    dispatch(searchAdvertRequest(searchPhrase));

    return () => {
      dispatch(searchAdvert(null));
    };
  }, [dispatch, searchPhrase]);
  console.log(searchPhrase);
  if (searchPhrase === '') return <Navigate to="/" />;

  return (
    <Container>
      {request.pending && <div>Loading...</div>}
      {request.error && <div>Error: {request.error}</div>}
      {result && (
        <div className={style.grid}>
          {result.map(advert => (<AdsCard key={advert._id} ad={advert} />))}
        </div>
      )}
      {result && result.length === 0 && <div>No results found</div>}
    </Container>
  );
};

export default SearchResult;