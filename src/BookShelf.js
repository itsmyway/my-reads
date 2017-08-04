import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class BookShelf extends Component {
  static PropTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  render(){
    const { books , category } = this.props
    //const books = this.props.books || []
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{category}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.map((book) => (
                <li key={book.id}>
                  <Book book={book} moveToShelf={this.props.onChangeShelf}/>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="open-search">
          <a>Add a book</a>
        </div>
      </div>
    )
  }
}

export default BookShelf
