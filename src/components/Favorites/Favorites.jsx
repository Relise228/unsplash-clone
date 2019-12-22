import React from 'react';
import { Grid } from '../Grid';
import { Request } from '../../request';

export class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      currPage: 1
    };
    this.nextImages = this.nextImages.bind(this);
  }

  setImages(images) {
    this.setState({ images });
  }

  componentDidMount() {
    this.fetchImages();
  }

  nextImages() {
    this.setState(
      state => {
        const newState = Object.assign(state);
        newState.currPage++;
        return newState;
      },
      () => {
        this.fetchImages();
      }
    );
  }

  fetchImages() {
    const request = new Request();
    request.get(
      `https://api.unsplash.com/users/${localStorage.currUser}/likes?per_page=20&page=${this.state.currPage}`,
      imageJSON => {
        const images = this.state.images.concat(JSON.parse(imageJSON));
        this.setImages(images);
        console.log(images);
      },
      error => {},
      {
        Authorization: `Authorization: Bearer ${localStorage.token}`
      }
    );
  }

  onUnlike(id) {
    const request = new Request();
    request.delete(
      `https://api.unsplash.com/photos/${id}/like`,
      response => {
        console.log(response);
      },
      err => {
        console.error(err);
      },
      {
        Authorization: `Authorization: Bearer ${localStorage.token}`
      }
    );
  }

  render() {
    return (
      <div className='wrapper'>
        <Grid
          images={this.state.images}
          onUnlike={this.onUnlike}
          home={false}
        />
        <button className='load-button' onClick={this.nextImages}>
          Load More
        </button>
      </div>
    );
  }
}
