import { useSelector } from "react-redux";
import { getAdverts, getRequest } from "../../../redux/advertsRedux";
import AdsCard from "../../common/AdsCard/AdsCard";
import style from "./NewAdverts.module.scss";
import { Link } from "react-router-dom";
import { getUser } from "../../../redux/userRedux";
import { Oval } from 'react-loader-spinner';

const NewAdverts = () => {
  const adverts = useSelector(state => getAdverts(state));
  const request = useSelector(state => getRequest(state));
  const user = useSelector(state => getUser(state));

  if (request.pending) 
    return 
    <div className={style.loading}>
      <Oval visible={true} height={80} width={80} color='#4fa94d' ariaLabel='oval-loading' />  
    </div>;
  if (request.error) return <p>Error</p>;

  return (
    <div className={style.root}>
      <div className={style.info}>
        <h1>Adverts</h1>
        {user && <Link to="/advert/new">Add new advert</Link>}
      </div>
        <p>Here you can find all the adverts</p>
      <ul className={style.list}>
        {adverts.map(ad => (
          <li key={ad._id}>
            <AdsCard ad={ad} />
          </li>
        ))}
      </ul>
    </div>
  )
};

export default NewAdverts;