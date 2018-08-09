import React, {Component} from 'react'
import propTypes from 'prop-types'

class Book extends Component {
  
  handleSelection = event => {
    const book = this.props.book;
      this.props.moveBook(book, event.target.value)
  }
  
  render() {
    const {book, shelves} = this.props;
    
    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 188, backgroundImage:`url("${book.imageLinks.thumbnail}")` }}></div>
            <div className="book-shelf-changer">
              <select defaultValue={book.shelf? book.shelf: 'none'} onChange={this.handleSelection}>
                <option value="move" disabled>Move to...</option>
                {
                  shelves.map(shelf => {
                    const camelCasedShelf = (shelf.charAt(0).toLowerCase() + shelf.substr(1)).split(' ').join('');
                    return <option value={camelCasedShelf} key={camelCasedShelf}>{shelf}</option>
                  })
                }
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
    shelves: propTypes.array.isRequired
};

export default Book