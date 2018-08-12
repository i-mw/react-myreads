import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import './index.css'

/**
 * For static version:
 * Create custom basename for BrowserRouter.
 * On Github pages ,for example, "https://i-mw.github.io/react-myreads/",
 *  basename = '/react-myreads'
 * On any other website, local host or any development url, basename = '/'
 */
let hostname = window.location.hostname,
    basename;

if (hostname.search('github.io') > -1) {
  // The app is hosted on github pages -not root directory-
  basename = '/react-myreads';
} else {
  // The app is hosted on root directory
  basename = '/';
}


/**
 * Insert App into Actual DOM wrapped by 
 * BrowserRouter with custom basename
 * to control routeing
 */
ReactDOM.render(
  <BrowserRouter basename={basename}><App /></BrowserRouter>,
  document.getElementById('root')
)
