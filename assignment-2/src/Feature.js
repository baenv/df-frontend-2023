import React, { useContext } from 'react';

import {
  ListVisibleBooksContext,
  OpenAddBookPopupContext,
  PaginationContext,
  SearchContext,
} from './Context';
import {
  getBooksByPage,
  storePaginationConfigToLocalStorage,
} from './Utils';

const Feature = () => {
  const { setOpenAddBookPopup } = useContext(OpenAddBookPopupContext);
  const { setBookData } = useContext(ListVisibleBooksContext);
  const { paginationInfo, setPaginationInfo } = useContext(PaginationContext);
  const { setSearchTerm } = useContext(SearchContext);

  const handleSearch = async (e) => {
    const pagination = {
      ...paginationInfo,
      currentPage: 1,
    }

    const searchTerm = e.target.value;
    await setSearchTerm(searchTerm);

    const { data, totalBooks } = getBooksByPage(pagination, searchTerm);
    await setBookData(data);

    pagination.totalBooks = totalBooks;
    await setPaginationInfo(pagination);
    storePaginationConfigToLocalStorage(pagination)
  }

  const handleAddBook = () => {
    setOpenAddBookPopup(true);
  }

  return (
      <div className="feature">
        {/* Search box  */}
        <input className="search-input" type="text" placeholder="Search..." onChange={handleSearch}/>
        {/* Button to open a popup to add a book  */}
        <button className="btn-add" onClick={handleAddBook}>Add Book</button>
      </div>
  )
}

export default Feature;
