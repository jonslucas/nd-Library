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

  clearSearch = () => {
    this.setState({
      searchResults: []
    });
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
    let shelfRef = {};
    this.state.books.forEach(b=>{
      shelfRef[b.id] = b.shelf;
    });
    BooksAPI.search(query, 25)
    .then(res=>{
      const out = res.map(r=>{
        const shelf = shelfRef.hasOwnProperty(r.id) ? {shelf: shelfRef[r.id]} : {shelf: 'none'}
        return Object.assign({}, shelf, r);
      });
      return out;
    })
    .then(searchResults=>{
      this.setState({
        searchResults
      });
    })
  }

  render() {
    const { books, searchResults } = this.state;

    return (
      <div className="app">
        <Route path="/search" render={() => {
          return (
            <BookSearch
              searchBooks={this.handleSearch}
              results={searchResults}
              onMove={this.moveShelf}
              clear={this.clearSearch}
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
