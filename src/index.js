import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import './index.css'

/**
 * For static version:
 * Create custom basename for BrowserRouter.
 * On local host, basename = '/'
 * On Github pages (main app page) path is ,for example, "https://i-mw.github.io/react-myreads/",
 *  basename = '/react-myreads'
 * On Github pages (search page) path is ,for example, "https://i-mw.github.io/react-myreads/search",
 *  stil basename = '/react-myreads'
 */
let basename = window.location.pathname.split('/');
basename[basename.length - 1] === 'search' && (basename.pop());
basename = basename.join('/');

/**
 * Insert App into Actual DOM wrapped by 
 * BrowserRouter with custom basename
 * to control routering
 */
ReactDOM.render(
  <BrowserRouter basename={basename}><App /></BrowserRouter>,
  document.getElementById('root')
)
