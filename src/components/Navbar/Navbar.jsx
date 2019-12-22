import React from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import { SearchForm } from '../SearchForm';

export class Navbar extends React.Component {
  render() {
    return (
      <nav className='nav'>
        <div className='nav__content'>
          <div className='nav__search-form'>
            <SearchForm onSearchSucceed={this.props.onSearchSucceed} />
          </div>

          <ul className='nav__menu-item'>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/favorites'>Favorites</Link>
            </li>
            <li>
              <Link to='/auth'>Authorization</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
