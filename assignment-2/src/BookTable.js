import React, { useContext } from 'react';

import {
  ListVisibleBooksContext,
  OpenDeleteBookPopupContext,
} from './Context';

const BookTable = ({setSelectedBook}) => {
  const { bookData } = useContext(ListVisibleBooksContext);
  const { setOpenDeleteBookPopup } = useContext(OpenDeleteBookPopupContext);

  return (
    // <!-- Table to display CMS content -->
    <table id="books-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Author</th>
          <th>Topic</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          bookData.map((book) => {
            return (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.topic}</td>
                <td>
                  <button className="btn" onClick={() => {
                    setOpenDeleteBookPopup(true);
                    setSelectedBook(book);
                  }
                  }>Delete</button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  );
}

export default BookTable;
