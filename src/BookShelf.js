import React, { Component } from 'react'
import Book from './Book'

class BookShelf extends Component {

  parseShelf = (title) => {
    switch(title) {
      case 'Currently Reading':
        return 'currentlyReading';
      case 'Want to Read':
        return 'wantToRead';
      case 'Read':
        return 'read';
      default:
        return 'none';
    }
  }

  render() {
    const {title, books, onMove } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book=>(
              <li key={book.id}>
                <Book book={book} onMove={onMove} shelf={ this.parseShelf(title) }/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}


export default BookShelf
