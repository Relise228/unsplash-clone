import React from 'react';
import { Request } from '../../request';
import { Grid } from '../Grid';

export class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      currPage: 1
    };
    this.nextImages = this.nextImages.bind(this);
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
      `https://api.unsplash.com/search/photos?per_page=20&page=${this.state.currPage}&query=${this.props.match.params.query}&client_id=8e3110562cafd135577201768335bce1a3caf935904cf2564ee5920e939eba6e`,
      responseJSON => {
        const response = JSON.parse(responseJSON);
        if (response && response.results) {
          const images = this.state.images.concat(
            JSON.parse(responseJSON).results
          );
          this.setImages(images);
        } else {
          console.error('response is empty ', responseJSON);
        }
      },
      e => {
        throw new Error(e);
      }
    );
  }
  componentDidMount() {
    this.fetchImages();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.query !== prevProps.match.params.query)
      this.fetchImages();
  }

  setImages(images) {
    this.setState({ images });
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

  render() {
    return (
      <div className='wrapper'>
        <Grid images={this.state.images} home={true} onLike={this.onLike} />
        <button className='load-button' onClick={this.nextImages}>
          Load More
        </button>
      </div>
    );
  }
}
