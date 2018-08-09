import React, {Component} from 'react'
import propTypes from 'prop-types'
import Book from './Book'

class Shelf extends Component {
  render() {
    const {shelfName, shelfBooks, moveBook, shelves}= this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {shelfBooks.map((book) => (
              <Book key={book.id} book={book} moveBook={moveBook} shelves={shelves}/>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

Shelf.propTypes = {
  shelfName: propTypes.string.isRequired,
  shelfBooks: propTypes.array.isRequired,
  moveBook: propTypes.func.isRequired,
  shelves: propTypes.array.isRequired
};

export default Shelf