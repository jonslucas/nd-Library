import React, { Component } from 'react'


class Book extends Component {

  render() {
    const { title, authors, imageLinks, shelf } = this.props.book;
    const onMove = this.props.onMove;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageLinks.thumbnail}")` }}></div>
          <div className="book-shelf-changer">
            <select onChange={(e)=>{
              e.preventDefault();
              onMove(this.props.book, e.target.value);
            }} value={ shelf }>
              <option value="null" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">
          {authors}
        </div>
      </div>
    );
  }
}


export default Book
