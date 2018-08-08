import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import propTypes from 'prop-types'
import Shelf from './Shelf'

class ListBooks extends Component {
  render() {
    const {books, moveBook, removeBook}= this.props;
    const shelves = ['Currently Reading', 'Want To Read', 'Read'];

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          <div>{shelves.map(shelf => {
            const camelCasedShelf = (shelf.charAt(0).toLowerCase() + shelf.substr(1)).split(' ').join('');
            const shelfBooks = books.filter(book => (book.shelf === camelCasedShelf));
            return <Shelf key={camelCasedShelf} shelfName={shelf} books={shelfBooks} moveBook={moveBook} removeBook={removeBook}/>
          })}</div>
        </div>

        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>  
    );
  }
}

ListBooks.propTypes = {
  books: propTypes.array.isRequired,
  moveBook: propTypes.func.isRequired,
  removeBook: propTypes.func.isRequired
}

export default ListBooks