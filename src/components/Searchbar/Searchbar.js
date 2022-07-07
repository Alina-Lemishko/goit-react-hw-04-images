import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit, setPage }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmitForm = e => {
    e.preventDefault();

    onSubmit(searchValue);
    setPage(1);
    setSearchValue('');
  };

  const handleValueChange = e => {
    setSearchValue(e.target.value.toLowerCase());
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmitForm}>
        <button type="submit" className={s.SearchFormButton}>
          <BsSearch size={25} />
        </button>

        <input
          onChange={handleValueChange}
          className={s.SearchFormInput}
          type="text"
          value={searchValue}
          placeholder="Search images and photos"
          required
        />
      </form>
    </header>
  );
}
