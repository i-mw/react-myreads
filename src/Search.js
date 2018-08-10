import React, {Component} from 'react'
import propTypes from 'prop-types'
import SearchInput from './SearchInput'
import SearchResults from './SearchResults'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
  state = {
    searchTerm: '',
    searchedBooks: [],
    isLoading: false
  }

  setLoadingStatus = status => {
    this.setState({isLoading: status});
  }

  changeSearchTerm = event => {
    this.setState({searchTerm: event.target.value});
    this.searchBooks(event.target.value);
  }

  searchBooks(query) {
    if (query === '') {
      this.setState({searchedBooks: []});
      this.setLoadingStatus(false);
    } else {
        this.setState({searchedBooks: []});
        this.setLoadingStatus(true);
        BooksAPI.search(query)
          .then(books => {
            if (query === this.state.searchTerm) {
              this.setState({searchedBooks: books});
              this.props.setOnline(true);
              this.setLoadingStatus(false);
            }
          })
          .catch(_ => {
            this.setState({searchedBooks: []});
            this.props.setOnline(false);
            this.setLoadingStatus(false);
          })
      }
  }

  render() {
    const {myBooks, moveBook, shelves, isOnline} = this.props;
    let {searchTerm, searchedBooks, isLoading} = this.state;

    return (
      <div className="search-books">
        <SearchInput searchTerm={searchTerm} changeSearchTerm={this.changeSearchTerm}/>
        <SearchResults myBooks={myBooks} searchedBooks={searchedBooks}
        moveBook={moveBook} shelves={shelves} isOnline={isOnline} isLoading={isLoading}/>
      </div>
    )
  }
}

Search.propTypes = {
  shelves: propTypes.array.isRequired,
  myBooks: propTypes.array.isRequired,
  moveBook: propTypes.func.isRequired,
  isOnline: propTypes.bool.isRequired,
  setOnline: propTypes.func.isRequired
}

export default Search