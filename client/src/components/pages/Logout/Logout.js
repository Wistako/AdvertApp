import { useEffect } from "react";
import { API_URL } from "../../../config";
import { logOut } from "../../../redux/userRedux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
      const options = {
        method: 'DELETE',
      };
    
      fetch(`${API_URL}/auth/logout`, options)
        .then(() => {
          dispatch(logOut());
          navigate('/');
        });

  })
  

  return null;
};

export default Logout;