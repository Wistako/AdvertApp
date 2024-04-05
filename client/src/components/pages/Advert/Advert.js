import { Link, useParams } from "react-router-dom";
import style from "./Advert.module.scss";
import Container from "../../common/Container/Container";
import { useSelector } from "react-redux";
import { getAdvertById } from "../../../redux/advertsRedux";
import { IMGS_URL } from "../../../config";
import { getUser } from "../../../redux/userRedux";

const Advert = () => {
  const { id } = useParams();
  const currentUser = useSelector(state => getUser(state));
  const advert = useSelector(state => getAdvertById(state, id));
  if(!advert) return null;
  const user = advert.user;


  return (
    <Container>
      <h2 className={style.title}>Advert</h2>
      <section className={style.wrapper}>
        <div className={style.image}>
          <img src={IMGS_URL + advert.image} alt={advert.title} />
        </div>
        <div>
          <div className={style.user}>
            <img src={IMGS_URL + user.avatar} alt={user.login} className={style.avatar} />
            <p>User: {user.login}</p>
            <p>Phone: {user.phone}</p>
          </div>
          <div className={style.details}>
            {currentUser.id === advert.user._id &&  
              <div className={style.buttons}>
                <Link to={`/advert/edit/${advert._id}`} className={style.button}>Edit</Link>
                <Link to={`/advert/delete/${advert._id}`} className={style.button}>Delete</Link>
              </div>
            } 
            <p><span>Price: {advert.price}$</span></p>
            <p>Location: {advert.location}</p>
          </div>
        </div>
        <div className={style.description}>
          <h3>{advert.title}</h3>
          <p>{advert.content}</p>
        </div>
      </section>
    </Container>
  );
};

export default Advert;