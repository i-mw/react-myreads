import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import propTypes from 'prop-types'

/**
 * @constructor
 * @description SearchInput component representing input field in search page
 * @param {} - All parameters (props) are defined using propTypes
 * at the bottom of the page
 */
class SearchInput extends Component {

  /**
   * @description Draws UI
   */
  render() {
    const {searchTerm, changeSearchTerm} = this.props;

    /**
     * Input field listens to two events: onChange and onKeyDown
     * onKeyDown becomes handy when the internet goes down and then up.
     * At this moment, the user can press 'Enter' to fire fetch request
     */
    return (
      <div className="search-books-bar">
        <Link to="/" className="close-search">Close</Link>
        
        <div className="search-books-input-wrapper">
          <input autoFocus="true" type="text" defaultValue={searchTerm}
          onChange={changeSearchTerm}
          onKeyDown={event => event.keyCode === 13 && (changeSearchTerm(event))} 
          placeholder="Search by title or author" />
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