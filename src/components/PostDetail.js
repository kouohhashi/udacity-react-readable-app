import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as MyAPI from '../utils/MyAPI'

import { connect } from 'react-redux'
import { withRouter } from 'react-router';

import upvote from '../upvote.png'
import downvote from '../downvote.png'

import CommentOnPost from './CommentOnPost'

class PostDetail extends Component {

  state = {
    deleteSuccess: false,
    deleteError: false
  }

  // lets get category here
  componentDidMount() {
    MyAPI.getPostsWithID(this.props.match.params.postId).then((data) => {
      !data.id ? this.props.history.push("/notfound") : this.setState(data)
    })
  }

  deletePost = () => {
    MyAPI.deletePostsWithID(this.props.match.params.postId).then((data) => {
      if (data === 200){
        this.setState({
          deleteSuccess: true
        })
      } else {
        this.setState({
          deleteError: true
        })
      }
    })
  }

  voteClicked = (option) => {
    MyAPI.voteOnPostWithID(this.props.match.params.postId, option).then((data) => {
      this.setState(data)
    })
  }


  render() {

    let dispDate = this.state.timestamp ? new Date(this.state.timestamp).toString() : ''

    return(
      <div className='container'>

        <div className='row' style={{
          marginTop:30,
          marginBottom:30
        }}>
          <div className='col-md-12' style={{
            textAlign: 'right'
          }}>
            <Link to="/">back to top</Link>
          </div>
        </div>

        {/* title */}
        <div className='row' style={{marginBottom:60}}>
          <div className='col-md-2'></div>
          <div className='col-md-8'>
            <span style={{ fontSize: 28 }}>{this.state.title}</span>
          </div>
          <div className='col-md-2'></div>
        </div>

        {/* error message */}
        {this.state.deleteSuccess && (
          <div className='row'>
            <div className='col-md-12'>
              <span style={{ fontSize: 20, color: 'green' }}>Deleted</span>
            </div>
          </div>
        )}
        {this.state.deleteError && (
          <div className='row'>
            <div className='col-md-12'>
              <span style={{ fontSize: 20, color: 'red' }}>Sorry we could not delete the post!</span>
            </div>
          </div>
        )}

        <div className='row'>
          <div className='col-md-3'></div>
          <div className='col-md-6' style={{textAlign: 'right'}}>
            <Link to={'/update_post/'+this.props.match.params.postId }>
              <span style={{marginRight:10}}>Edit</span>
            </Link>
            <span style={{cursor:'pointer', color: '#337ab7'}} onClick={this.deletePost}>Delete</span>
          </div>
          <div className='col-md-3'></div>
        </div>

        {/* meta information */}
        <div className='row'>
          <div className='col-md-6'></div>
          <div className='col-md-3'>

            <div className='row'>
              <div className='col-md-6' style={{ textAlign: 'right' }}>
                <span style={{ fontWeight: 'bold' }}>Author:</span>
              </div>
              <div className='col-md-6' style={{ textAlign: 'left' }}>
                <span>{this.state.author}</span>
              </div>
            </div>

          </div>
          <div className='col-md-3'></div>
        </div>

        <div className='row'>
          <div className='col-md-6'></div>
          <div className='col-md-3'>

            <div className='row'>
              <div className='col-md-6' style={{ textAlign: 'right' }}>
                <span style={{ fontWeight: 'bold' }}>Category:</span>
              </div>
              <div className='col-md-6' style={{ textAlign: 'left' }}>
                <span>{this.state.category}</span>
              </div>
            </div>

          </div>
          <div className='col-md-3'></div>
        </div>



        <div className='row'>
          <div className='col-md-6'></div>
          <div className='col-md-3'>

            <div className='row'>
              <div className='col-md-6' style={{ textAlign: 'right' }}>
                <span style={{ fontWeight: 'bold' }}>Votes:</span>
              </div>
              <div className='col-md-6' style={{ textAlign: 'left' }}>
                <span>({this.state.voteScore})</span>
                <img
                  onClick={() => this.voteClicked('upVote')}
                  src={upvote} alt={"upvote"} style={{
                    width:20,
                    marginLeft:10,
                    marginRight:5,
                    cursor: 'pointer'
                  }}/>
                <img
                  onClick={() => this.voteClicked('downVote')}
                  src={downvote} alt={"downvote"} style={{
                    width:20,
                    marginLeft:5,
                    marginRight:5,
                    cursor: 'pointer'
                  }}/>

              </div>
            </div>

          </div>
          <div className='col-md-3'></div>
        </div>

        {/* body */}
        <div className='row' style={{ marginTop: 15}}>
          <div className='col-md-3'></div>
          <div className='col-md-6' style={{
              fontSize:18,
              textAlign:'left',
              borderTopStyle: 'dashed',
              borderTopWidth: 1,
              borderTopColor: '#cccccc',
              borderBottomStyle: 'dashed',
              borderBottomWidth: 1,
              borderBottomColor: '#cccccc',
              paddingBottom: 15,
              paddingTop: 15
            }}>
            <span>{this.state.body}</span>
          </div>
          <div className='col-md-3'></div>
        </div>

        {/* date */}
        <div className='row'>
          <div className='col-md-3'></div>
          <div className='col-md-6' style={{
              textAlign: 'right',
            }}>
            <span style={{ fontWeight: 'bold' }}>Date:</span>
            <span>{dispDate}</span>
          </div>
          <div className='col-md-3'></div>
        </div>


        <CommentOnPost postId={this.props.match.params.postId} />

      </div>
    )
  }
}

// react-redux
function mapStateToProps ( {categories} ) {
  return {
    categories
  }
}

// export default PostDetail
export default withRouter(connect( mapStateToProps )(PostDetail))
