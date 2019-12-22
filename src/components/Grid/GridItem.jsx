import React from 'react';

import './GridItem.scss';

export class GridItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spans: 0,
      home: this.props.home
    };
    this.imageRef = React.createRef();
    this.setSpans = this.setSpans.bind(this);
  }

  componentDidMount() {
    this.imageRef.current.addEventListener('load', this.setSpans);
  }

  componentWillUnmount() {
    this.imageRef.current.removeEventListener('load', this.setSpams);
  }

  onUnlike() {}

  render() {
    const { image } = this.props;
    const { spans } = this.state;

    return (
      <div className={'grid-item'} style={{ gridRowEnd: `span ${spans}` }}>
        <img
          src={image.urls.small}
          alt=''
          ref={this.imageRef}
          onDoubleClick={
            this.state.home
              ? this.props.onLike.bind(this, this.props.id)
              : this.props.onUnlike.bind(this, this.props.id)
          }
        />
      </div>
    );
  }

  setSpans = () => {
    const imageHeight = this.imageRef.current.clientHeight;
    const rawHeight = 5;
    const spans = Math.ceil(imageHeight / rawHeight);
    this.setState(state => ({ ...state, spans }));
  };
}
