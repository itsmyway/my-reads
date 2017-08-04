import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class Book extends Component{
  static PropTypes = {
    book: PropTypes.object.isRequired,
    moveToShelf: PropTypes.func.isRequired
  }
  updateShelf = (e) => {
    const { book, moveToShelf } = this.props
    let shelf = e.target.value
    BooksAPI.update(book, shelf).then(() => {
      moveToShelf(book, shelf)
    })
  }
  render(){
    const book = this.props.book

    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks['thumbnail']})` }}></div>
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={this.updateShelf}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    )
  }
}

export default Book
