import React from 'react';
import Unsplash, { toJson } from 'unsplash-js';
import './Authorization.scss';

let key = '8e3110562cafd135577201768335bce1a3caf935904cf2564ee5920e939eba6e';
let secret = 'aa7e869e8f50347b86b0f11f5c0eacd007810223d619202073d111030c612779';

const unsplash = new Unsplash({
  accessKey: key,
  secret: secret,
  callbackUrl: 'http://localhost:3000/auth',
  bearerToken: localStorage.token
});

export class Authorization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authorized: localStorage.auth,
      currentUser: {}
    };
    this.onLogOut = this.onLogOut.bind(this);
  }

  componentDidMount() {
    console.log(localStorage.token);
    console.log(this.state.authorized);
    unsplash.currentUser
      .profile()
      .then(toJson)
      .then(json => {
        localStorage.setItem('currUser', json.username);
        console.log(localStorage.currUser);
        this.setState({ currentUser: json });
        console.log(this.state.currentUser);
      });

    if (
      this.props.location.search.includes('code') &&
      localStorage.token !== ''
    ) {
      console.log(this.props.location.search.substr(6));
      unsplash.auth
        .userAuthentication(this.props.location.search.substr(6))
        .then(toJson)
        .then(json => {
          console.log(json);
          unsplash.auth.setBearerToken(json.access_token);
          localStorage.setItem('token', json.access_token);
          localStorage.setItem('auth', true);
        });
    }
  }

  onLogIn() {
    const authenticationUrl = unsplash.auth.getAuthenticationUrl([
      'public',
      'read_user',
      'write_user',
      'read_photos',
      'write_photos',
      'write_likes'
    ]);

    window.location.assign(authenticationUrl);
  }

  onLogOut() {
    console.log('exit');
  }

  render() {
    return (
      <div className='auth-status'>
        <h2>{this.state.authorized ? 'Authorized' : 'Not Authorizzed'}</h2>
        <h3>Hi dear {this.state.currentUser.username}</h3>
        <button onClick={this.state.authorized ? this.onLogOut : this.onLogIn}>
          {this.state.authorized ? 'Log Out' : 'Log In'}
        </button>
        <button onClick={this.onLogIn}>Log In</button>
      </div>
    );
  }
}
