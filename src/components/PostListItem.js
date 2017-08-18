import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import upvote from '../upvote.png'
import downvote from '../downvote.png'
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { apiUpdatePost } from '../actions'
import * as MyAPI from '../utils/MyAPI'

class PostListItem extends Component {

  voteClicked = (option) => {
    MyAPI.voteOnPostWithID(this.props.post.id, option).then((data) => {
      this.props.mapDispatchToPropsUpdatePost(data)
    })
  }

  render(){

    let dispDate = this.props.post.timestamp ? new Date(this.props.post.timestamp).toString() : ''

    return(

      <div className='container' style={{ marginTop: 15, marginBottom:15 }}>

        <div className='row'>
          <div className='col-md-2'></div>
          <div className='col-md-4' style={{ textAlign: 'left'}}>
            <span>{dispDate}</span>
          </div>

          <div className='col-md-4' style={{ textAlign: 'right'}}>
            ({this.props.post.category}) , {this.props.post.voteScore} votes

            <img
              onClick={() => this.voteClicked('upVote')}
              src={upvote} alt={"upvote"} style={{
                width:20,
                marginLeft:10,
                cursor: 'pointer'
              }}/>

            <img
              onClick={() => this.voteClicked('downVote')}
              src={downvote} alt={"downvote"} style={{
                width:20,
                marginLeft:10,
                cursor: 'pointer'
              }}/>

          </div>

          <div className='col-md-2'></div>
        </div>

        <div className='row'>
          <div className='col-md-2'></div>
          <div className='col-md-8' style={{ textAlign: 'left', fontSize:18 }}>
            <Link to={'/'+this.props.post.category+'/'+this.props.post.id }>{this.props.post.title}</Link>
          </div>
          <div className='col-md-2'></div>
        </div>

        <div className='row' style={{
            borderBottomStyle: 'dashed',
            borderBottomWidth: 1,
            borderBottomColor: '#cccccc',
          }}>
          <div className='col-md-2'></div>
          <div className='col-md-8' style={{ textAlign: 'right', fontSize:14 }}>
            by {this.props.post.author}
          </div>
          <div className='col-md-2'></div>
        </div>

      </div>
    )
  }
}

// export default PostListItem

function mapDispatchToProps (dispatch) {
  return {
    mapDispatchToPropsUpdatePost: (data) => dispatch(apiUpdatePost({ post: data})),
  }
}

export default withRouter(connect( null, mapDispatchToProps )(PostListItem))
