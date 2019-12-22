import React from 'react';
import './App.scss';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home/';
import { Search } from './components/Search';
import { Authorization } from './components/Authorization';
import { Favorites } from './components/Favorites';

export class App extends React.Component {
  searchHandler(value) {
    console.log(value);
  }

  render() {
    return (
      <div>
        <Navbar onSearchSucceed={this.searchHandler} />
        <Switch>
          <Route exact={true} path='/' component={Home} />
          <Route path='/search/:query' component={Search} />
          <Route path='/auth' component={Authorization} />
          <Route path='/favorites' component={Favorites} />
          <Route path='/404' component={() => <h1>Page not found!</h1>} />
          <Redirect to='/404' />
        </Switch>
      </div>
    );
  }
}

export default App;
