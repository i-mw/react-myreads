import React, {Component} from 'react'
import propTypes from 'prop-types'
import Book from './Book'

class SearchResults extends Component {
  render() {
    const {myBooks, searchedBooks, moveBook, shelves, isOnline, isLoading} = this.props;

    return(
      <div className="search-books-results">
        {isLoading ? (
          <img src="./loading.gif" alt="loading" style={{display: 'block', marginRight: 'auto', marginLeft: 'auto'}}/>
        ) : (
          !isOnline &&
            (<p className="network-error">Network error! Check your connection.</p>)
        )}{
          (searchedBooks.error) === "empty query" ? (
            <p style={{textAlign: "center"}}>We didn't find any results. Try different search query.</p> 
          ) : (
            <ol className="books-grid">
              {searchedBooks.map(searchedBook => {
                const sameBook = myBooks.find(myBook => searchedBook.id === myBook.id);
                sameBook ? searchedBook.shelf = sameBook.shelf : searchedBook.shelf = 'none';
                return <Book key={searchedBook.id} book={searchedBook} moveBook={moveBook} shelves={shelves}/>
              })}
            </ol>
          )
        }
      </div>
    );
  }
}

SearchResults.propTypes = {
  myBooks: propTypes.array.isRequired,
  searchedBooks: propTypes.oneOfType([
    propTypes.array.isRequired,
    propTypes.object.isRequired
  ]),
  moveBook: propTypes.func.isRequired,
  shelves: propTypes.array.isRequired,
  isOnline: propTypes.bool.isRequired,
  isLoading: propTypes.bool.isRequired
}

export default SearchResults