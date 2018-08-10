import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import propTypes from 'prop-types'

class SearchInput extends Component {
  render() {
    const {searchTerm, changeSearchTerm} = this.props;

    return (
      <div className="search-books-bar">
        <Link to="/" className="close-search">Close</Link>
        
        <div className="search-books-input-wrapper">
          <input autoFocus="true" type="text" defaultValue={searchTerm} onChange={changeSearchTerm} placeholder="Search by title or author" />
        </div>
      </div>
    )
  }
}

SearchInput.propTypes = {
  searchTerm: propTypes.string.isRequired,
  changeSearchTerm: propTypes.func.isRequired
}

export default SearchInput