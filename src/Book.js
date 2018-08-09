import React, {Component} from 'react'
import propTypes from 'prop-types'

class Book extends Component {
  handleSelection = event => {
    const book = this.props.book;
    if (event.target.value === 'none') {
      this.props.removeBook(book.id);
    } else {
      this.props.moveBook(book.id, event.target.value)
    }
  }
  
  render() {
    const book = this.props.book;
    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 188, backgroundImage:`url("${book.imageLinks.thumbnail}")` }}></div>
            <div className="book-shelf-changer">
              <select defaultValue={book.shelf? book.shelf: 'none'} onChange={this.handleSelection}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors[0]}</div>
        </div>
      </li>  
    )
  }
}

Book.propTypes = {
    book: propTypes.object.isRequired,
    moveBook: propTypes.func.isRequired,
    removeBook: propTypes.func.isRequired
};

export default Book