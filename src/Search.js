import React, {Component} from 'react'
import propTypes from 'prop-types'
import SearchInput from './SearchInput'
import SearchResults from './SearchResults'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
  state = {
    searchTerm: '',
    searchedBooks: []
  }

  changeSearchTerm = event => {
    this.setState({searchTerm: event.target.value});
    this.searchBooks(event.target.value);
  }

  searchBooks(query) {
    query === ''? 
      this.setState({searchedBooks: []}):
      BooksAPI.search(query).then(books => {
        this.setState({searchedBooks: books});
      })
  }

  render() {
    const {myBooks, moveBook, shelves} = this.props;
    let {searchTerm, searchedBooks} = this.state;

    return (
      <div className="search-books">
        <SearchInput searchTerm={searchTerm} changeSearchTerm={this.changeSearchTerm}/>
        <SearchResults myBooks={myBooks} searchedBooks={searchedBooks} moveBook={moveBook} shelves={shelves}/>
      </div>
    )
  }
}

Search.propTypes = {
  shelves: propTypes.array.isRequired,
  myBooks: propTypes.array.isRequired,
  moveBook: propTypes.func.isRequired
}

export default Search