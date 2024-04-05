import { getAdvertById } from '../../../redux/advertsRedux';
import AdsForm from '../../common/AdsForm/AdsForm';
import Container from '../../common/Container/Container';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

const EditAds = () => {
  const { id } = useParams();
  const advert = useSelector(state => getAdvertById(state, id));
  return (
    <Container>
      <AdsForm ads={advert} />
    </Container>  
  );
};

export default EditAds;