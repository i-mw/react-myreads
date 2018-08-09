import React, {Component} from 'react'
import propTypes from 'prop-types'
import Book from './Book'

class SearchResults extends Component {
  render() {
    const {myBooks, searchedBooks, moveBook, removeBook} = this.props;

    return(
      <div className="search-books-results">
        <ol className="books-grid">
          {searchedBooks.map(searchedBook => {
            myBooks.forEach(myBook => searchedBook.id === myBook.id && (
              searchedBook.shelf = myBook.shelf
            ));
            return <Book key={searchedBook.id} book={searchedBook} moveBook={moveBook} removeBook={removeBook}/>
          })}
        </ol>
      </div>
    );
  }
}

SearchResults.propTypes = {
  myBooks: propTypes.array.isRequired,
  searchedBooks: propTypes.array.isRequired,
  moveBook: propTypes.func.isRequired,
  removeBook: propTypes.func.isRequired
}

export default SearchResults