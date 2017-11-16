import React from 'react'
import { Route, Switch } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookSearch from './BookSearch'
import Library from './Library'
import NotFound from './NotFound'
import './App.css'


class BooksApp extends React.Component {
  state = {
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
          ...state.books.filter(b=>b.id !== book.id)]
      };
    });

    BooksAPI.update(book, toShelf);
  }

  handleSearch = (query) => {
    if (!query) {
      this.clearSearch();
      return;
    }
    let shelfRef = {};
    this.state.books.forEach(b=>{
      shelfRef[b.id] = b.shelf;
    });
    BooksAPI.search(query, 25)
    .then(res=>{
      if (res.error) return [];

      return res.map(r=>{
        const shelf = shelfRef.hasOwnProperty(r.id) ? {shelf: shelfRef[r.id]} : {shelf: 'none'}
        return Object.assign({}, shelf, r);
      });
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
        <Switch>
          <Route exact path="/" render={()=>{
            return (
              <Library
                books={books}
                onMove={this.moveShelf}
              />
            );
          }} />
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
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
