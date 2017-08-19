import React, { Component } from 'react'
import upvote from '../upvote.png'
import downvote from '../downvote.png'
import * as MyAPI from '../utils/MyAPI'
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { apiUpdateComment, apiDeleteComment } from '../actions/CommentsActions'
// import Modal from 'react-modal'

class CommentOnPostItem extends Component {

  state = {
    // updateModalOpenFlg: false,
    editing:false,
    editingBody: this.props.comment.body
  }

  voteClicked = (option) => {
    MyAPI.voteOnCommentWithID(this.props.comment.id, option).then((data) => {
      this.props.mapDispatchToPropsUpdateComment(data)
    })
  }

  deleteComment = () => {
    MyAPI.deleteCommentWithID(this.props.comment.id).then((data) => {
      this.props.mapDispatchToPropsDeleteComment(this.props.comment.id)
    })
  }

  startEdit = () => {
    this.setState({ editing: true })
  }

  saveEdit = () => {

    if ( this.state.editingBody === this.props.comment.body ){
      return;
    }

    if (!this.state.editingBody){
      return;
    }

    // save
    const param = {
      body: this.state.editingBody,
      timestamp: Date.now()
    }
    MyAPI.updateCommentWithID(this.props.comment.id, param).then((data) => {
      this.props.mapDispatchToPropsUpdateComment(data)
    })

    this.setState({ editing: false })
  }


  commentEditted = (e) => {
    this.setState({ editingBody: e.target.value })
  }

  render(){

    let dispDate = this.props.comment.timestamp ? new Date(this.props.comment.timestamp).toString() : ''

    return (
      <div style={{marginTop:15, marginBottom:15}}>

        <div>
          <div className='row'>
            <div className='col-md-3'></div>
            <div className='col-md-3' style={{textAlign:'left'}}>

              <span>({this.props.comment.voteScore})</span>

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
            <div className='col-md-3' style={{textAlign:'right'}}>

              {this.state.editing ? (
                <span
                  onClick={this.saveEdit}
                  style={{
                    cursor: 'pointer',
                    marginRight:8,
                    color: '#337ab7'
                  }}>Save</span>
              ) : (
                <span
                  onClick={this.startEdit}
                  style={{
                    cursor: 'pointer',
                    marginRight:8,
                    color: '#337ab7'
                  }}>Edit</span>
              )}


              <span
                onClick={this.deleteComment}
                style={{
                  cursor: 'pointer',
                  color: '#337ab7'
                }}>Delete</span>
            </div>
            <div className='col-md-3'></div>
          </div>

          <div className='row'>
            <div className='col-md-3'></div>
            <div className='col-md-4' style={{textAlign:'left'}}>
              {dispDate}
            </div>
            <div className='col-md-2' style={{textAlign:'right'}}>
              <span>by {this.props.comment.author}</span>
            </div>
            <div className='col-md-3'></div>
          </div>

          { this.state.editing ? (

            <div className='row'>
              <div className='col-md-3'></div>
              <div className='col-md-6' style={{textAlign:'left'}}>
                <input
                  onChange={this.commentEditted}
                  type='text'
                  className='form-control'
                  value={this.state.editingBody} />
              </div>
              <div className='col-md-3'></div>
            </div>

          ) : (

            <div className='row'>
              <div className='col-md-3'></div>
              <div className='col-md-6' style={{textAlign:'left'}}>
                {this.props.comment.body}
              </div>
              <div className='col-md-3'></div>
            </div>

          ) }


        </div>

      </div>
    )
  }
}

// function mapStateToProps ({ comments }) {
//   return {
//     comments,
//   }
// }

function mapDispatchToProps (dispatch) {
  return {
    mapDispatchToPropsUpdateComment: (data) => dispatch(apiUpdateComment({ comment: data})),
    mapDispatchToPropsDeleteComment: (data) => dispatch(apiDeleteComment({ commentId: data})),

  }
}

// export default CommentOnPostItem
export default withRouter(connect( null, mapDispatchToProps )(CommentOnPostItem))
