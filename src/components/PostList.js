import React, { Component } from 'react'
import * as MyAPI from '../utils/MyAPI'

import PostListItem from './PostListItem'

import shortid from 'shortid'

import { apiGetPosts } from '../actions'

import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

class PostList extends Component {

  state = {
    sortMethod: 'vote',
    timeWeight: 'normal',
    voteWeight: 'bold',
  }

  // lets get category here
  componentDidMount() {

    console.log("props:", this.props)

    MyAPI.getAllPosts().then((data) => {
      const posts = data.filter( (post) => post.deleted !== true )
      this.props.mapDispatchToPropsGetPosts(posts)
    })
  }

  setSortMethodTime = () => {
    this.setState({
      sortMethod: 'time',
      timeWeight: 'bold',
      voteWeight: 'normal',
    })
  }

  setSortMethodVotes = () => {
    this.setState({
      sortMethod: 'vote',
      timeWeight: 'normal',
      voteWeight: 'bold',
    })
  }
  
  render() {

    let filterCategory = null;
    if (this.props.match && this.props.match.params && this.props.match.params.category) {
      filterCategory = this.props.match.params.category;
    }

    let postList = []
    if (filterCategory === null){
      if (this.state.sortMethod === 'time') {
        postList = postList.concat(this.props.posts.list)
                    .sort((a, b) => a.timestamp < b.timestamp)
      } else if (this.state.sortMethod === 'vote') {
        postList = postList.concat(this.props.posts.list)
                    .sort((a, b) => a.voteScore < b.voteScore)
      } else {
        postList = postList.concat(this.props.posts.list)
      }
    } else {

      if (this.state.sortMethod === 'time') {
        postList = postList.concat(this.props.posts.list)
                    .filter( (item) => item.category === filterCategory )
                    .sort((a, b) => a.timestamp < b.timestamp)
      } else if (this.state.sortMethod === 'vote') {
        postList = postList.concat(this.props.posts.list)
                    .filter( (item) => item.category === filterCategory )
                    .sort((a, b) => a.voteScore < b.voteScore)
      } else {
        postList = postList.concat(this.props.posts.list)
                    .filter( (item) => item.category === filterCategory )
      }
    }

    return(
      <div>

        <div className='row' style={{marginBottom: 30}}>
          <div className='col-md-12'>
            <span>Sort by </span>
            <span
              onClick={this.setSortMethodTime}
              style={{
                marginLeft: 5,
                marginRight: 5,
                cursor: 'pointer',
                fontWeight: `${this.state.timeWeight}`
              }}>time</span>
            <span
              onClick={this.setSortMethodVotes}
              style={{
              marginLeft: 5,
              marginRight: 5,
              cursor: 'pointer',
              fontWeight: `${this.state.voteWeight}`
              }}>vote</span>
          </div>
        </div>

        <div className='row' style={{marginBottom: 30}}>
          <div className='col-md-12'>
            <span>Filter by </span>

            {this.props.categories && this.props.categories.list &&
              this.props.categories.list.map( (category) => (
                <Link key={category.path} to={'/'+category.path }>
                  <span
                    style={{
                      marginLeft: 5,
                      marginRight: 5,
                      cursor: 'pointer',
                      fontWeight: filterCategory === category.path ? 'bold' : 'normal'
                    }}>{category.name}</span>
                </Link>
              ) )
            }

            <Link to='/'>
              <span
                style={{
                  cursor: 'pointer',
                  fontWeight: filterCategory === null ? 'bold' : 'normal'
                }}>show all</span>
            </Link>

          </div>
        </div>


        {this.props.posts && this.props.posts.list &&
          postList.map( (post) => (
              <PostListItem key={shortid.generate()} post={post} />
            ) )
        }

      </div>
    )
  }
}

function mapStateToProps ({ posts, categories }) {
  return {
    posts,
    categories,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    mapDispatchToPropsGetPosts: (data) => dispatch(apiGetPosts({posts: data})),
  }
}

// export default PostList
export default withRouter(connect( mapStateToProps, mapDispatchToProps )(PostList))
