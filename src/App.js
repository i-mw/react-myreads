import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import ListBooks from './ListBooks'
import Search from './Search'
import NotFound from './NotFound'
import * as BooksAPI from './BooksAPI'
import './App.css'

/**
 * Important: check here: https://github.com/i-mw/react-myreads#components-architecture
 * to get a grasp on components architecture
 */

/**
 * @constructor
 * @description App component representing the whole app
 * It wraps ListBooks and Search components
 */
class BooksApp extends Component {
  /** 
   * shelves: are defined in top parent state to be extensible and scalable
   * its value is obtained to tag shelves on the main page and also
   * by the dropdown menu of books in both main and search pages
   * 
   * isOnline: Any request sent out will modify it in 'then' or 'catch'
   * isLoading: Any request sent out will modify it in 'then' or 'catch'
   */
  state = {
    shelves: ['Currently Reading', 'Want To Read', 'Read'],
    myBooks: [],
    isOnline: true,
    isLoading: true
  }

  /** 
   * @description Retrieve myBooks after first insertion into the DOM
   */
  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setLoading(false);
        this.setState({myBooks: books});
        this.setOnline(true);
      })
      .catch(_ => {
        this.setLoading(false);
        this.setOnline(false);

      });
  }

  /** 
   * @description Change internet connectivity status (isOnline)
   * @param {boolean} status - Connected to the internet or not
   */
  setOnline = status => {
    this.setState({isOnline: status});
  }

  /**
   * @description Change request status (isLoading books)
   * @param {boolean} status - Loading books or not
   */
  setLoading = status => {
    this.setState({isLoading: status})
  }

  /** 
   * @description Change book's shelf or remove it
   * Will be called from main and search pages on changing
   * any book shelf from the dropdown menu
   * @param {object} book - The book to change its shelf
   * @param {string} shelf - The shelf to change location to
   */
  moveBook = (book, shelf) => {
    // Generate new state out of the old one
    let modifiedBook = JSON.parse(JSON.stringify(book));
    modifiedBook.shelf = shelf;
    let myNewBooks = this.state.myBooks.filter(myBook => myBook.id !== book.id);
    myNewBooks.push(modifiedBook);
    let oldBooks = this.state.myBooks;

    // Insert new state
    this.setState({myBooks: myNewBooks});

    // Update my books on database
    BooksAPI.update(book, shelf)
      // Request succeeded: 
      // - User is online
      .then(_ => {this.setOnline(true)})
      // Request failed: 
      // - User is offline
      // - change state to old one
      .catch(_ => {
        // Redraw after 0.5 s to prevent flickering
        window.setTimeout(_ => {
          this.setState({myBooks: oldBooks});
          this.setOnline(false);
        },500)
      })
  }

  /**
   * @description Draws UI
   */
  render() {
    const {shelves, myBooks, isOnline, isLoading} = this.state;

    return (
      <div className="app">
        <Switch>
          <Route exact path="/" render={() => {
            return <ListBooks shelves={shelves} myBooks={myBooks} moveBook={this.moveBook}
            isOnline={isOnline} isLoading={isLoading}/>
          }}/>
          <Route exact path="/search" render={() => {
            return <Search shelves={shelves} myBooks={myBooks} moveBook={this.moveBook}
            isOnline={isOnline} setOnline={this.setOnline}/>
          }}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    )
  }
}

export default BooksApp
