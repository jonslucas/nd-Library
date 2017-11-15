# MyReads Project

This is a simple reading list tracker, wherein the user can keep track of books currently being
read, books they would like to read, and books they have completed.  It is a quick, at-a-glance
personal library.  Users are able to add new books to their reading list via the /search route.
And users can move books between shelves without a new page reload.


## Installing and Running

As long as you have Node.js and npm installed, then installing and running is as simple as calling

    npm install && npm start

inside of the directory.  Or, if yarn is more your style, then call

    yarn install && yarn start



## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.
