import React, { Component } from 'react'
import shortid from 'shortid'
import { Link } from 'react-router-dom'

import * as MyAPI from '../utils/MyAPI'

import { connect } from 'react-redux'

// import { withRouter } from 'react-router-dom';
import { withRouter } from 'react-router';

// import PropTypes from 'prop-types'

class PostEdit extends Component {

  // var postId = null;
  // propTypes

  // static propTypes = {
  //   contacts: PropTypes.array.isRequired,
  //   onDeleteContact: PropTypes.func.isRequired
  // }

  state = {
    createSuccess:false,
    createError:null,
    title: '',
    body: '',
    owner: '',
    author: '',
    category: ''
  }

  componentDidMount() {
    this.checkIfUpdate()
  }

  // check postId here
  checkIfUpdate = () => {
    if ( this.props.match && this.props.match.params && this.props.match.params.postId ) {
      this.postId = this.props.match.params.postId;
    }
    if (this.postId) {
      MyAPI.getPostsWithID(this.props.match.params.postId).then((data) => {
        this.setState(data)
        this.author_default = data.author
      })
    }
  }

  createOrUpdatePost = (e) => {
    e.preventDefault()

    if (this.postId) {
      // update
      this.updatePost()

    } else {
      this.createPost()
    }
  }

  updatePost = () => {

    // input check
    if (!this.state.title){
      this.setState({
        createError: 'Please input title'
      })
      return;
    }
    if (!this.state.body){
      this.setState({
        createError: 'Please input body'
      })
      return;
    }

    const { title, body } = this.state

    MyAPI.updatePostsWithID( this.postId, title, body).then((data) => {
      this.setState({
        createSuccess: true,
        createError: null
      })
    })
  }


  createPost = () => {

    // input check
    if (!this.state.title){
      this.setState({
        createError: 'Please input title'
      })
      return;
    }
    if (!this.state.body){
      this.setState({
        createError: 'Please input body'
      })
      return;
    }
    if (!this.state.author){
      this.setState({
        createError: 'Please input author'
      })
      return;
    }
    if (!this.state.category){
      this.setState({
        createError: 'Please select a category'
      })
      return;
    }

    this.postId = shortid.generate();

    const post = {
      id: this.postId,
      timestamp: Date.now(),
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      category: this.state.category
    }

    MyAPI.createPost(post).then((data) => {
      // dispatch something here
      console.log(data);
      if (data.voteScore === 1){
        // success

        this.setState({
          createSuccess: true,
          createError: null
        })

      } else {
        this.setState({
          createSuccess: false,
          createError: 'Error'
        })
      }
    })
  }

  handleOptionChange = (event) => {
    // console.log(event.target.value)
    this.setState({
      category: event.target.value,
      createError: null
    })
  }

  authorUpdated = (event) => {
    this.setState({
      author: event.target.value,
      createError: null
    })
  }

  titleUpdated = (event) => {
    this.setState({
      title: event.target.value,
      createError: null
    })
  }

  bodyUpdated = (event) => {
    this.setState({
      body: event.target.value,
      createError: null
    })
  }

  render() {

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

        <div className='row' style={{
          marginBottom:30
        }}>
          <div className='col-md-12'>

            {this.postId ? (
              <span style={{ fontSize: 20 }}>Update the post</span>
            ):(
              <span style={{ fontSize: 20 }}>Create a post</span>
            )}

          </div>
        </div>

        {this.state.createSuccess && (
          <div className='row' style={{
            marginBottom:30
          }}>
            <div className='col-md-12'>
              <span style={{ fontSize: 20, color: 'green' }}>Success!</span>
            </div>
          </div>
        )}

        {this.state.createError && (
          <div className='row' style={{
            marginBottom:30
          }}>
            <div className='col-md-12'>
              <span style={{ fontSize: 20, color: 'red' }}>{this.state.createError}</span>
            </div>
          </div>
        )}

        <form>
          <div className='row' style={{ marginTop: 15 }}>
            <div className='col-md-3'></div>
            <div className='col-md-6 input-group'>
              <span className='input-group-addon' style={{width:100}}>author:</span>
              {this.postId ? (
                <input
                  readOnly
                  value={this.state.author}
                  className='form-control'
                  onChange={this.authorUpdated}
                  type="text" />
              ) : (
                <input
                  value={this.state.author}
                  className='form-control'
                  onChange={this.authorUpdated}
                  type="text" />
              )}

            </div>
            <div className='col-md-3'></div>
          </div>
          <div className='row' style={{ marginTop: 15 }}>
            <div className='col-md-3'></div>
            <div className='col-md-6 input-group'>
              <span className='input-group-addon' style={{
                width:100,
                borderRightColor: '#cccccc',
                borderRightWidth: 1,
                borderRightStyle: 'solid',
              }}>category:</span>
              <span className='input-group' style={{
                borderTopRightRadius: 4,
                borderBottomRightRadius:4,
                width:'100%',
                height:28,
                borderTopStyle: 'solid',
                borderTopWidth: 1,
                borderTopColor: '#cccccc',
                borderBottomStyle: 'solid',
                borderBottomWidth: 1,
                borderBottomColor: '#cccccc',
                borderRightStyle: 'solid',
                borderRightWidth: 1,
                borderRightColor: '#cccccc',
                textAlign: 'left',
              }}>
              {this.props.categories && this.props.categories.list && this.props.categories.list.map( (category) => (
                <span key={category.path} style={{ marginLeft: 10 }}>

                  {this.postId ? (
                    <input
                      disabled
                      onChange={this.handleOptionChange}
                      type='radio'
                      className='form-inline'
                      name='category_inputs'
                      checked={this.state.category === category.path}
                      value={category.path} />
                  ) : (
                    <input
                      onChange={this.handleOptionChange}
                      type='radio'
                      className='form-inline'
                      name='category_inputs'
                      checked={this.state.category === category.path}
                      value={category.path} />
                  )}

                  <span style={{ marginLeft: 5 }}>{category.name}</span>
                </span>
              ) )}
              </span>

            </div>
            <div className='col-md-3'></div>
          </div>
          <div className='row' style={{ marginTop: 15 }}>
            <div className='col-md-3'></div>
            <div className='col-md-6 input-group'>
              <span className='input-group-addon' style={{width:100}}>title:</span>
              <input
                value={this.state.title}
                onChange={this.titleUpdated}
                className='form-control'
                type="text" />
            </div>
            <div className='col-md-3'></div>
          </div>
          <div className='row' style={{ marginTop: 15 }}>
            <div className='col-md-3'></div>
            <div className='col-md-6 input-group'>
            <span className='input-group-addon' style={{width:100}}>body:</span>
              <textarea
                value={this.state.body}
                onChange={this.bodyUpdated}
                className='form-control'></textarea>
            </div>
            <div className='col-md-3'></div>
          </div>
          <div className='row' style={{ marginTop: 15 }}>
            <div className='col-md-3'></div>
            <div className='col-md-6' style={{textAlign: 'right'}}>
              <button className='btn btn-primary' onClick={this.createOrUpdatePost}>Submit</button>
            </div>
            <div className='col-md-3'></div>
          </div>
        </form>
      </div>
    )
  }
}

// react-redux
function mapStateToProps ( {categories} ) {
  // console.log("edit mapStateToProps 1:", categories)
  // let categories_1 = []
  // if (categories && categories.categories && categories.categories.length !== undefined) {
  //   console.log("edit mapStateToProps 2:", categories)
  //   categories_1 = categories.categories
  // }
  return {
    categories
  }
}

// function mapDispatchToProps (dispatch) {
//   return {
//     selectRecipe: (data) => dispatch(addRecipe(data)),
//     remove: (data) => dispatch(removeFromCalendar(data))
//   }
// }

// export default PostEdit
// export default connect( mapStateToProps, mapDispatchToProps )(PostEdit)
// export default connect( mapStateToProps )(PostEdit)
export default withRouter( connect( mapStateToProps )(PostEdit) )
