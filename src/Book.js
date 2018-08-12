import React, {Component} from 'react'
import propTypes from 'prop-types'

/**
 * @constructor
 * @description Book component representing a book card in main or search pages
 * @param {} - All parameters (props) are defined using propTypes
 * at the bottom of the page
 */
class Book extends Component {
  
  /**
   * @description Event handler for the onChange event attached to dropdown menu
   * @param {object} event - onChange event object
   */
  handleSelection = event => {
    const book = this.props.book;
    this.props.moveBook(book, event.target.value);
  }
  
  /**
   * @description Draws UI
   */
  render() {
    const {book, shelves} = this.props;
    
    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 188, backgroundImage:`url("${(!book.imageLinks || !book.imageLinks.thumbnail) ? './placeholder.jpg': book.imageLinks.thumbnail}")` }}></div>
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={this.handleSelection}>
                <option value="move" disabled>Move to...</option>
                { 
                  // Build the 3 middle options represent shelves names
                  // Built using map to be extensible and scalable
                  shelves.map(shelf => {
                    const camelCasedShelf = (shelf.charAt(0).toLowerCase() + shelf.substr(1)).split(' ').join('');
                    return <option value={camelCasedShelf} key={camelCasedShelf}>{shelf}</option>
                  })
                }
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{/* handle invalid title */book.title ? book.title: 'Unknown'}</div>
          <div className="book-authors">
            { //handle invalid authors data
              (!book.authors || !book.authors[0]) ?
              "Unknown" : 
              book.authors.map((author, index) => {
                return (<span key={index}>{author}<br/></span>)
              })
            }
          </div>
        </div>
      </li>  
    )
  }
}

Book.propTypes = {
    book: propTypes.object.isRequired,
    moveBook: propTypes.func.isRequired,
    shelves: propTypes.array.isRequired
};

export default Book