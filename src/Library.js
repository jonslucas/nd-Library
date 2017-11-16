import React from 'react'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import BookShelf from './BookShelf'

const Library = (props) => {
  const { books, onMove } = props;
  const shelves = [
    {
      title: 'Currently Reading',
      shelf: 'currentlyReading',
    },{
      title: 'Want to Read',
      shelf: 'wantToRead',
    },{
      title: 'Read',
      shelf: 'read',
    }
  ]
  books.sort(sortBy('title'));
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {
            shelves.map(shelf=>(
              <BookShelf
                key={shelf.title}
                title={shelf.title}
                books={books.filter(b=>b.shelf===shelf.shelf)}
                onMove={onMove}
              />
            ))
          }
        </div>
      </div>
      <div className="open-search">
        <Link to="/search"> Add a book </Link>
      </div>
    </div>
  );
}

export default Library
