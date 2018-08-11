import React, {Component} from 'react'
import propTypes from 'prop-types'
import SearchInput from './SearchInput'
import SearchResults from './SearchResults'
import * as BooksAPI from './BooksAPI'

/**
 * @constructor
 * @description Search component representing the search page
 * It wraps SearchInput and SearchResults components
 * @param {} - All parameters (props) are defined using propTypes
 * at the bottom of the page
 */
class Search extends Component {
  /**
   * isLoading: refers to reqest status
   * if true, the search page will show loading icon
   */
  state = {
    searchTerm: '',
    searchedBooks: [],
    isLoading: false
  }

  /** 
   * @description Change requst status (isLoading)
   * @param {boolean} status - Making a request or steady
   */
  setLoadingStatus = status => {
    this.setState({isLoading: status});
  }

  /**
   * @description Event handler for the onChange and onKeyDown events
   * attached to search input
   * @param {object} event - onChange or onKeyDown event object
   */
  changeSearchTerm = event => {
    this.setState({searchTerm: event.target.value});
    this.searchBooks(event.target.value);
  }

  /**
   * @description Fetch the server for books matching query
   * @param {string} query - The query to find results for
   */
  searchBooks(query) {
    // Empty query? clear previous search results
    if (query === '') {
      this.setState({searchedBooks: []});
      this.setLoadingStatus(false);
    } else {
        // Clear previous search results before firing new request
        this.setState({searchedBooks: []});
        // Show loading icon
        this.setLoadingStatus(true);
        BooksAPI.search(query)
          // Request succeeded: 
          // - User is online
          // - Show searched results
          // - Hide loading icon
          .then(books => {
            if (query === this.state.searchTerm) {
              this.setState({searchedBooks: books});
              this.props.setOnline(true);
              this.setLoadingStatus(false);
            }
          })
          // Request failed: 
          // - User is offline
          // - Clear previous searched results
          // - Hide loading status
          .catch(_ => {
            this.setState({searchedBooks: []});
            this.props.setOnline(false);
            this.setLoadingStatus(false);
          })
      }
  }

  /**
   * @description Draws UI
   */
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