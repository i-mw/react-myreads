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
    BooksAPI.mwgetAll().then(books => {
      this.setState({myBooks: books});
    });
  }

  moveBook(bookId, shelf) {
  }

  removeBook(bookId) {
  }

  render() {
    const {shelves, myBooks} = this.state;

    return (
      <div className="app">
        <Route exact path="/" render={() => {
          return <ListBooks shelves={shelves} myBooks={myBooks} moveBook={this.moveBook} removeBook={this.removeBook}/>
        }}/>
        <Route path="/search" render={() => {
          return <Search shelves={shelves} myBooks={myBooks} moveBook={this.moveBook} removeBook={this.removeBook}/>
        }}/>
      </div>
    )
  }
}

export default BooksApp
