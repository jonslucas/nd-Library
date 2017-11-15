import React, { Component } from 'react'


class Book extends Component {

  handleChange = (e) => {
    e.preventDefault();
    this.props.onMove(this.props.book, e.target.value);
  }

  render() {

    const { title, authors, imageLinks, shelf } = this.props.book;
    let authorStr;

    if (authors.length > 1) {
      authorStr = `${authors.slice(0,-1).join(", ")} and ${authors[authors.length -1]}`;
    } else {
      authorStr = authors;
    }

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageLinks.thumbnail}")` }}></div>
          <div className="book-shelf-changer">
            <select onChange={this.handleChange} value={ shelf }>
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
          {authorStr}
        </div>
      </div>
    );
  }
}


export default Book
