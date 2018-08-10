import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import ListBooks from './ListBooks'
import Search from './Search'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    shelves: ['Currently Reading', 'Want To Read', 'Read'],
    myBooks: [],
    status: ''
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState({myBooks: books});
      })
      .catch(_ => this.setState({status: 'noNetwork'}));
  }

  moveBook = (book, shelf) => {
    let modifiedBook = JSON.parse(JSON.stringify(book));
    modifiedBook.shelf = shelf;
    let myNewBooks = this.state.myBooks.filter(aBook => aBook.id !== book.id);
    myNewBooks.push(modifiedBook);
    let oldBooks = this.state.myBooks;

    this.setState({
      myBooks: myNewBooks
    });

    BooksAPI.update(book, shelf)
      .catch(_ => {
        this.setState({myBooks: oldBooks, status: 'noNetwork'});
      })
  }

  render() {
    const {shelves, myBooks, status} = this.state;

    return (
      <div className="app">
        <Route exact path="/" render={() => {
          return <ListBooks shelves={shelves} myBooks={myBooks} moveBook={this.moveBook} status={status}/>
        }}/>
        <Route path="/search" render={() => {
          return <Search shelves={shelves} myBooks={myBooks} moveBook={this.moveBook}/>
        }}/>
      </div>
    )
  }
}

export default BooksApp
