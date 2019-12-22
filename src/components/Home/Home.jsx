import React from 'react';
import { Request } from '../../request';
import { Grid } from '../Grid';

import './Home.scss';
export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      currentPage: 1
    };
    this.nextImages = this.nextImages.bind(this);
  }

  setImages(images) {
    this.setState({ images });
  }

  componentDidMount() {
    this.fetchImages();
  }

  onLike(id) {
    const request = new Request();
    request.post(
      `https://api.unsplash.com/photos/${id}/like`,
      response => {},
      err => {
        console.error(err);
      },
      {
        Authorization: `Authorization: Bearer ${localStorage.token}`
      }
    );
  }

  fetchImages() {
    const request = new Request();
    request.get(
      `https://api.unsplash.com/photos?per_page=30&page=${this.state.currentPage}`,
      imageJSON => {
        const images = this.state.images.concat(JSON.parse(imageJSON));
        this.setImages(images);
      },
      error => {},
      {
        Authorization:
          'Client-ID 8e3110562cafd135577201768335bce1a3caf935904cf2564ee5920e939eba6e'
      }
    );
  }

  nextImages() {
    this.setState(
      state => {
        const newState = Object.assign(state);
        newState.currentPage++;
        return newState;
      },
      () => {
        this.fetchImages();
      }
    );
  }

  render() {
    return (
      <div>
        <div>
          <Grid images={this.state.images} onLike={this.onLike} home={true} />
        </div>

        <button className='load-button' onClick={this.nextImages}>
          Load More
        </button>
      </div>
    );
  }
}
