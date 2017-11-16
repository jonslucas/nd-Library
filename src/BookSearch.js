import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class BookSearch extends Component {

  static propTypes = {
    results: PropTypes.array.isRequired,
    onMove: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.clear();
  }

  handleChange = (e) => {
    e.preventDefault();
    this.props.searchBooks(e.target.value);
  }

  render() {

    const { results, onMove } = this.props;

    let visible;

    if (results.length > 0) {
      visible = (
        <BookShelf
          title="Search Results"
          books={results}
          onMove={onMove} />
        );
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" onChange={this.handleChange} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {visible}
          </ol>
        </div>
      </div>
    );
  }
}



export default BookSearch
