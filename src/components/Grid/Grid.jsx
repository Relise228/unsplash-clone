import React from 'react';
import { GridItem } from './GridItem';

import './Grid.scss';

export class Grid extends React.Component {
  render() {
    return (
      <div className='grid'>
        {this.props.images.map(image => (
          <GridItem
            image={image}
            id={image.id}
            key={image.id}
            onUnlike={this.props.onUnlike}
            onLike={this.props.onLike}
            home={this.props.home}
          />
        ))}
      </div>
    );
  }
}
