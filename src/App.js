import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import ListBooks from './ListBooks'
import Search from './Search'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    shelves: ['Currently Reading', 'Want To Read', 'Read', 'Favorite'],
    myBooks: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({myBooks: books});
    });
  }

  moveBook = (book, shelf) => {
    let modifiedBook = JSON.parse(JSON.stringify(book));
    modifiedBook.shelf = shelf;
    let myNewBooks = this.state.myBooks.filter(aBook => aBook.id !== book.id);
    myNewBooks.push(modifiedBook);
    
    this.setState({
      myBooks: myNewBooks
    });

    BooksAPI.update(book, shelf);
  }

  render() {
    const {shelves, myBooks} = this.state;

    return (
      <div className="app">
        <Route exact path="/" render={() => {
          return <ListBooks shelves={shelves} myBooks={myBooks} moveBook={this.moveBook}/>
        }}/>
        <Route path="/search" render={() => {
          return <Search shelves={shelves} myBooks={myBooks} moveBook={this.moveBook}/>
        }}/>
      </div>
    )
  }
}

export default BooksApp
