import React, { Component } from 'react';
// import logo from './logo.svg';
import '../App.css';

import { Route, Switch } from 'react-router-dom'
import PostEdit from './PostEdit'
import NoMatch from './NoMatch'

import * as MyAPI from '../utils/MyAPI'

// import PostList from './PostList'
import PostDetail from './PostDetail'

// redux
import { connect } from 'react-redux'
import { apiGetCategories } from '../actions/CategoriesActions'

import { withRouter } from 'react-router';

import MainPage from './MainPage'

class App extends Component {

  // lets get category here
  componentDidMount() {
    MyAPI.getCategories().then((data) => {
      this.props.mapDispatchToPropsGetCategories(data)
    })
  }

  render() {

    return (
      <div className="App">

        <Switch>

          <Route exact path='/ceate_post' render={() => (
            <PostEdit />
          )} />

          <Route exact path='/notfound' component={NoMatch} />

          <Route path='/update_post/:postId' render={() => (
            <PostEdit />
          )} />

          <Route exact path='/' render={() => (
            <MainPage />
          )} />

          <Route path='/:category/:postId' component={PostDetail}/>

          <Route path='/:category' render={() => (
              <MainPage />
          )} />

          <Route component={NoMatch} />

        </Switch>

      </div>
    );
  }
}

function mapStateToProps ({ categories }) {
  return {
    categories,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    mapDispatchToPropsGetCategories: (data) => dispatch(apiGetCategories({ categories: data})),
  }
}

// export default App;
export default withRouter(connect( mapStateToProps, mapDispatchToProps )(App))
