import React from 'react';

export class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }
  componentDidMount() {
    console.log(this.state.images);
  }

  render() {
    return <img src={this.state.images.small} alt='' />;
  }
}
