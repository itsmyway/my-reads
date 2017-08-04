import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import Book from './Book'

class SearchBooks extends Component {
  static PropTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }
  state = {
    query: '',
    books: []

  }
  updateQuery = query => {
    if(query){
      this.setState({query})
      this.searchBook()
    } else {
      this.clearSearch()
    }
  }
  searchBook = () => {
    BooksAPI.search(this.state.query.trim(), 25).then(books => {
      if (!books || !Array.isArray(books)) {
        books = [];
      }
      let myBookShelf = {}
      this.props.myBooks.forEach( myBook => {
        myBookShelf[myBook.id] = myBook
      })
      console.log('MyBooks' + JSON.stringify(myBookShelf))
      books.map( book => {
        if(myBookShelf[book.id]){
          return myBookShelf[book.id]
        } else {
          book.shelf = 'none'
          return book
        }
      })
      this.setState({ books });
    })
  }
  clearSearch = () => {
    this.setState({
      query: '',
      books: []
    })
  }
  render(){
    const { books , query } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                value={query}
                onChange={ event => this.updateQuery(event.target.value)}
              />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map(book =>
              <li key={book.id}>
                <Book book={book} moveToShelf={this.props.onChangeShelf}/>
              </li>
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
