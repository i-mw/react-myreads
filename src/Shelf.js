import React, {Component} from 'react'
import propTypes from 'prop-types'
import Book from './Book'

class Shelf extends Component {
  render() {
    const {shelfName, books, moveBook, removeBook}= this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <Book key={book.id} book={book} moveBook={moveBook} removeBook={removeBook}/>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

Shelf.propTypes = {
  shelfName: propTypes.string.isRequired,
  books: propTypes.array.isRequired,
  moveBook: propTypes.func.isRequired,
  removeBook: propTypes.func.isRequired
};

export default Shelf