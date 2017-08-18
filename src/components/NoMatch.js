import React, { Component } from 'react'

// 404 NotFound template
class NoMatch extends Component {
  render(){
    return (
      <div style={{
        marginTop: 100,
        textAlign: 'center'
      }}>
        Error: 404 page not found
      </div>
    )
  }
}

export default NoMatch
