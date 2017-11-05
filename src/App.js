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
    books: [],
    searchResults: []

  }

  componentDidMount() {
    BooksAPI.getAll().then((books)=>{
      this.setState({
        books
      });
    })
  }

  moveShelf = (book, toShelf) => {
    this.setState((state)=>{
      book.shelf = toShelf;
      return {
        books: [
          book,
          ...state.books.filter(bk=>book.id !== bk.id)]
      };
    });

    BooksAPI.update(book, toShelf);
  }

  handleSearch = (query) => {
    BooksAPI.search(query, 25).then(searchResults=>{
      this.setState({
        searchResults
      })
    })
  }

  render() {
    const { books, searchResults } = this.state;

    return (
      <div className="app">
        <Route path="/search" render={() => {
          return (
            <BookSearch
              search={this.handleSearch}
              results={searchResults}
              onMove={this.moveShelf}
            />
          );
        }} />
        <Route exact path="/" render={()=>{
          return (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                <BookShelf
                  title="Currently Reading"
                  books={books.filter(book=>book.shelf==='currentlyReading')}
                  onMove={this.moveShelf}
                />
                <BookShelf
                  title="Want to Read"
                  books={books.filter(book=>book.shelf==='wantToRead')}
                  onMove={this.moveShelf}
                />
                <BookShelf
                  title="Read"
                  books={books.filter(book=>book.shelf==='read')}
                  onMove={this.moveShelf}
                />
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
