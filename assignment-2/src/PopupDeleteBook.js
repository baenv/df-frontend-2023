import React, { useContext } from 'react';

import {
  ListVisibleBooksContext,
  OpenDeleteBookPopupContext,
  PaginationContext,
  SearchContext,
} from './Context';
import {
  deleteBookByID,
  getBooksByPage,
  storePaginationConfigToLocalStorage,
} from './Utils';

const PopupDeleteBook = ({selectedBook}) => {
  const { setBookData } = useContext(ListVisibleBooksContext);
  const { openDeleteBookPopup, setOpenDeleteBookPopup } = useContext(OpenDeleteBookPopupContext);
  const { paginationInfo, setPaginationInfo } = useContext(PaginationContext);
  const { searchTerm } = useContext(SearchContext);

  const handleSubmit = async(e) => {
    deleteBookByID(selectedBook.id);

    const { data, totalBooks } = getBooksByPage(paginationInfo, searchTerm);
    await setBookData(data);

    await setPaginationInfo({
      ...paginationInfo,
      totalBooks: totalBooks,
    });
    storePaginationConfigToLocalStorage(paginationInfo);

    setOpenDeleteBookPopup(false);
  };

  return (
    openDeleteBookPopup && (
    // <!-- Popup form for deleting a row -->
    <div className="popup-background" id="delete-book-popup-bg">
      <div className="popup-delete-book" id="delete-book-popup">
        <form action="" className="form-container" onSubmit={handleSubmit}>
          <h2>Delete Book</h2>
            <p id="delete-book-msg">Are you sure you want to delete this <b>{selectedBook.name}</b> book?</p>
          <div className="btn-group-delete">
            <button type="submit" className="btn" id="delete-book-btn">Delete</button>
            <button type="button" className="btn-cancel" id="cancel-delete-book-btn" onClick={() => {setOpenDeleteBookPopup(false)}}>Cancel</button>
          </div>
        </form>
      </div>
      </div>
    )
  )
}

export default PopupDeleteBook;
