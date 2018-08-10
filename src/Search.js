import React, {Component} from 'react'
import propTypes from 'prop-types'
import SearchInput from './SearchInput'
import SearchResults from './SearchResults'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
  state = {
    searchTerm: '',
    searchedBooks: [],
    status: ''
  }

  changeSearchTerm = event => {
    this.setState({searchTerm: event.target.value});
    this.searchBooks(event.target.value);
  }

  searchBooks(query) {
    if (query === '') {
      this.setState({searchedBooks: [], status: ''});
    } else {
        this.setState({searchedBooks: [], status: 'loading'});
        BooksAPI.search(query)
          .then(books => {
            (query === this.state.searchTerm) && (
              this.setState({searchedBooks: books, status: ''})
            )
          })
          .catch(_ => {
            this.setState({searchedBooks: [], status: 'noNetwork'});
          })
      }
  }

  render() {
    const {myBooks, moveBook, shelves} = this.props;
    let {searchTerm, searchedBooks, status} = this.state;

    return (
      <div className="search-books">
        <SearchInput searchTerm={searchTerm} changeSearchTerm={this.changeSearchTerm}/>
        <SearchResults myBooks={myBooks} searchedBooks={searchedBooks} moveBook={moveBook} shelves={shelves} status={status}/>
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