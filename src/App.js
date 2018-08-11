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
    isOnline: true
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState({myBooks: books});
        this.setOnline(true);
      })
      .catch(_ => this.setOnline(false));
  }

  setOnline = status => {
    this.setState({isOnline: status});
  }

  moveBook = (book, shelf) => {
    let modifiedBook = JSON.parse(JSON.stringify(book));
    modifiedBook.shelf = shelf;
    let myNewBooks = this.state.myBooks.filter(myBook => myBook.id !== book.id);
    myNewBooks.push(modifiedBook);
    let oldBooks = this.state.myBooks;

    this.setState({myBooks: myNewBooks});

    BooksAPI.update(book, shelf)
      .then(_ => {this.setOnline(true)})
      .catch(_ => {
        window.setTimeout(_ => {
          this.setState({myBooks: oldBooks});
          this.setOnline(false);
        },500)
      })
  }

  render() {
    const {shelves, myBooks, isOnline} = this.state;

    return (
      <div className="app">
        <Route exact path="/" render={() => {
          return <ListBooks shelves={shelves} myBooks={myBooks} moveBook={this.moveBook}
          isOnline={isOnline}/>
        }}/>
        <Route path="/search" render={() => {
          return <Search shelves={shelves} myBooks={myBooks} moveBook={this.moveBook}
          isOnline={isOnline} setOnline={this.setOnline}/>
        }}/>
      </div>
    )
  }
}

export default BooksApp
