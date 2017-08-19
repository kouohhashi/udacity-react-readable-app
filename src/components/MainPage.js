import React, { Component } from 'react'
import PostList from './PostList'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

class MainPage extends Component {

  render() {

    // redirect to 404 if category is not valid
    if (this.props.match && this.props.match.params && this.props.match.params.category){
      let category = this.props.match.params.category
      if (this.props && this.props.categories && this.props.categories.list) {
        let arr1 = this.props.categories.list.filter( (item) => item.path === category )
        if (arr1.length === 0){
          this.props.history.push("/notfound")
        }
      }
    }

    return(
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
    )
  }
}

// react-redux
function mapStateToProps ( {categories} ) {
  return {
    categories
  }
}

// export default withRouter(MainPage);
export default withRouter( connect( mapStateToProps )(MainPage) )
