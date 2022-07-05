import React, { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  handleSubmitForm = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.searchValue);
    this.setState({ searchValue: '' });
  };

  handleValueChange = e => {
    this.setState({ searchValue: e.target.value.toLowerCase() });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmitForm}>
          <button type="submit" className={s.SearchFormButton}>
            <BsSearch size={25} />
          </button>

          <input
            onChange={this.handleValueChange}
            className={s.SearchFormInput}
            type="text"
            value={this.state.searchValue}
            placeholder="Search images and photos"
            required
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
