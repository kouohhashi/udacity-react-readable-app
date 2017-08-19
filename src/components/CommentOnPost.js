import React, { Component } from 'react'
import * as MyAPI from '../utils/MyAPI'
import shortid from 'shortid'
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { apiGetComments, apiAddComment } from '../actions/CommentsActions'
import CommentOnPostItem from './CommentOnPostItem'

class CommentOnPost extends Component {

  state = {
    sortMethod: 'vote',
    timeWeight: 'normal',
    voteWeight: 'bold',
    errorMessage: null,
  }

  addComment = () => {

    if (!this.commentBody.value){
      this.setState({errorMessage: 'Please input body'})
      return;
    }
    if (!this.commentName.value){
      this.setState({errorMessage: 'Please input your name'})
      return;
    }

    const comment = {
      id: shortid.generate(),
      timestamp: Date.now(),
      body: this.commentBody.value,
      // owner: this.commentName.value,
      author: this.commentName.value,
      parentId: this.props.postId
    }

    MyAPI.addComment(comment).then((data) => {
      this.props.mapDispatchToPropsAddComment(data)

      this.commentBody.value = ''
      this.commentName.value = ''
    })
  }

  // get comments of this post
  componentDidMount() {
    MyAPI.getCommentsWithPostID(this.props.postId).then((data) => {
      const comments = data.filter( (comment) => comment.deleted === false )
      this.props.mapDispatchToPropsGetComments(comments)
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

  inputSomething = () => {
    this.setState({errorMessage: null})
  }

  render(){

    return(
      <div style={{marginTop: 60}}>

        <div className='row' style={{marginBottom:30}}>
          <div className='col-md-12' style={{fontSize: 20}}>Comments</div>
        </div>

        {/* comments list */}
        {this.props.comments && this.props.comments.list && this.props.comments.list.length > 0 && (
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
        )}

        {this.props.comments && this.props.comments.list && this.state.sortMethod === 'time' &&
          [].concat(this.props.comments.list)
            .sort((a, b) => a.timestamp < b.timestamp)
            .map( (comment) => (
              <CommentOnPostItem key={comment.id} comment={comment} />
            ) )
        }

        {this.props.comments && this.props.comments.list && this.state.sortMethod === 'vote' &&
          [].concat(this.props.comments.list)
            .sort((a, b) => a.voteScore < b.voteScore)
            .map( (comment) => (
              <CommentOnPostItem key={comment.id} comment={comment} />
            ) )
        }

        {/* comment form */}

        <div className='row' style={{marginTop: 30}}>
          <div className='col-md-3'></div>
          <div className='col-md-3'>
            <span style={{color: 'red'}}>{this.state.errorMessage}</span>
          </div>
          <div className='col-md-6'></div>
        </div>

        <div className='row' style={{marginTop: 30}}>
          <div className='col-md-3'></div>
          <div className='col-md-3 input-group' style={{paddingLeft: 15}}>
            <span className='input-group-addon' style={{width:100}}>Name:</span>
            <input
              onChange={this.inputSomething}
              ref={(input) => { this.commentName = input; }}
              className='form-control'
              type="text" />
          </div>
          <div className='col-md-6'></div>
        </div>

        <div className='row' style={{marginTop: 10}}>
          <div className='col-md-3'></div>
          <div className='col-md-6'>
            <textarea
              onChange={this.inputSomething}
              ref={(input) => { this.commentBody = input; }}
              placeholder='write something here...'
              className='form-control'></textarea>
          </div>
          <div className='col-md-3'></div>
        </div>

        <div className='row' style={{marginTop: 10, marginBottom: 60}}>
          <div className='col-md-3'></div>
          <div className='col-md-6' style={{textAlign: 'right'}}>
            <button onClick={this.addComment} className='btn btn-default'>Add a comment</button>
          </div>
          <div className='col-md-3'></div>
        </div>

      </div>
    )
  }
}

function mapStateToProps ({ comments }) {
  return {
    comments,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    mapDispatchToPropsGetComments: (data) => dispatch(apiGetComments({ comments: data})),
    mapDispatchToPropsAddComment: (data) => dispatch(apiAddComment({ comment: data})),
  }
}

// export default App;
export default withRouter(connect( mapStateToProps, mapDispatchToProps )(CommentOnPost))
// export default CommentOnPost
