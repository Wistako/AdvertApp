import style from './SearchAdverts.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SearchAdverts = () => {
  const navigate = useNavigate();
  const [searchPhrase, setSearchPhrase] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchPhrase}`);
  };

  return (
    <form className={style.root} onSubmit={handleSubmit}>
      <input type="text" value={searchPhrase} onChange={(e) => setSearchPhrase(e.target.value)} placeholder="Type here..." />
      <button>Search</button>
    </form>
  );
};

export default SearchAdverts;