import React, { Component } from 'react';
// import logo from './logo.svg';
import '../App.css';

import { Route, Switch, Link } from 'react-router-dom'
import PostEdit from './PostEdit'
import NoMatch from './NoMatch'

import * as MyAPI from '../utils/MyAPI'

// import { Link } from 'react-router-dom'

import PostList from './PostList'
import PostDetail from './PostDetail'

// redux
import { connect } from 'react-redux'
import { apiGetCategories } from '../actions'

import { withRouter } from 'react-router';

class App extends Component {

  // // state parameters
  // state = {
  //   categories: []
  // }

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

          <Route path='/post/:postId' component={PostDetail}/>

          <Route exact path='/ceate_post' render={() => (
            <PostEdit />
          )} />

          <Route exact path='/update_post/:postId' render={() => (
            <PostEdit />
          )} />

          <Route exact path='/' render={() => (
            <div className='container'>

              <div className='row' style={{
                marginTop:30,
                marginBottom:30
              }}>
                <div className='col-md-12' style={{
                  textAlign: 'right'
                }}>
                  <Link to="/ceate_post">Create a post</Link>
                </div>
              </div>

              <PostList />
            </div>
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
