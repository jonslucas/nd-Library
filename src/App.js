import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookSearch from './BookSearch'
import BookShelf from './BookShelf'
import './App.css'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    currentlyReading: [],
    wantToRead: [],
    read: []

  }

  componentDidMount() {
    BooksAPI.getAll().then((books)=>{
      this.setState({
        currentlyReading: books.filter(book=>book.shelf==='currentlyReading'),
        wantToRead: books.filter(book=>book.shelf==='wantToRead'),
        read: books.filter(book=>book.shelf==='read')
      });
    })
  }
  render() {
    return (
      <div className="app">
        <Route path="/search" component={BookSearch} />
        <Route exact path="/" render={()=>{
          return (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                <BookShelf title="Currently Reading" books={this.state.currentlyReading}/>
                <BookShelf title="Want to Read" books={this.state.wantToRead}/>
                <BookShelf title="Read" books={this.state.read}/>
                </div>
              </div>
              <div className="open-search">
                <Link to="/search"> Add a book </Link>
              </div>
            </div>
          );
        }} />
      </div>
    )
  }
}

export default BooksApp
