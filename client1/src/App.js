import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import MainLayout from "./components/layout/MainLayout/MainLayout";
import Advert from "./components/pages/Advert/Advert";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadAdvertsRequest } from "./redux/advertsRedux";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import { API_URL } from "./config";
import { logIn } from "./redux/userRedux";
import Logout from "./components/pages/Logout/Logout";
import AddAds from "./components/pages/AddAds/AddAds";
import DeleteAds from "./components/pages/DeleteAds/DeleteAds";
import EditAds from "./components/pages/EditAds/EditAds";
import SearchResult from "./components/pages/SearchResult/SearchResult";

function App() {
  
  const dispatch = useDispatch();

  useEffect(() => {
    const login = async () => {
      const res = await fetch(`${API_URL}/auth/user`);
      if (res.status === 200) {
        const user = await res.json();
        dispatch(logIn(user));
      }
    }
    login();
    dispatch(loadAdvertsRequest());
  }, [dispatch]);

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/advert/:id" element={<Advert />} />
        <Route path="/advert/new" element={<AddAds />} />
        <Route path="/advert/edit/:id" element={<EditAds />} />
        <Route path="/advert/delete/:id" element={<DeleteAds />} />
        <Route path="/search/:searchPhrase" element={<SearchResult />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Navigate to='/' />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
