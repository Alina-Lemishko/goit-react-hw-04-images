import React, { Component } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';

class App extends Component {
  state = {
    searchImg: '',
  };

  handleSubmit = image => {
    this.setState({ searchImg: image });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery searchImg={this.state.searchImg} />
        {/*  <Loader /> */}
      </>
    );
  }
}

export default App;
