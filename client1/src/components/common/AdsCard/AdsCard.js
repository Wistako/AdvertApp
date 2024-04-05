import styles from './AdsCard.module.scss';
import { IMGS_URL } from '../../../config';
import { useNavigate } from 'react-router-dom';

const AdsCard = ({ ad }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.card}>
      <img src={IMGS_URL + ad.image} alt={ad.title} />
      <h2 className={styles.title}>{ad.title}</h2>
      <div className={styles.info}>
        <div>
          <p>Price: <span>{ad.price}$</span></p>
          <p>{ad.location}</p>
        </div>
        
        <button onClick={() => navigate(`/advert/${ad._id}`)}>More info</button>
      </div>
    </div>
  );
};

export default AdsCard;