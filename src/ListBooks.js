import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ListBooks extends Component {
  static PropTypes = {
    books: PropTypes.array.isRequired
  }
  render(){
    const { books } = this.props
    console.log(JSON.stringify(books))
    console.log('Inside List Books'+ Array.isArray(books))
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
      </div>
    )
  }
}

export default ListBooks
