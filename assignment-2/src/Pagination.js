import { useContext } from 'react';

import {
  ListVisibleBooksContext,
  PaginationContext,
  SearchContext,
} from './Context';
import {
  getBooksByPage,
  storePaginationConfigToLocalStorage,
} from './Utils';

function Pagination() {
  const { paginationInfo, setPaginationInfo } = useContext(PaginationContext);
  const { setBookData } = useContext(ListVisibleBooksContext);
  const { searchTerm } = useContext(SearchContext);

  const totalPage = parseInt(paginationInfo.totalBooks / paginationInfo.booksPerPage) + 1;
  const currentPage = parseInt(paginationInfo.currentPage);

  const handlePagination = async (cp) => {
    if (cp < 1 || cp > totalPage) {
      return;
    }

    const pagination = {
      ...paginationInfo,
      currentPage: cp,
    }

    const {data, totalBooks} = getBooksByPage(pagination, searchTerm);
    await setBookData(data);

    pagination.totalBooks = totalBooks;
    await setPaginationInfo(pagination);
    storePaginationConfigToLocalStorage(pagination);
  }

  const first3Pages = [1, 2, 3];
  const current3Pages = [currentPage - 1, currentPage, currentPage + 1];
  const last3Pages = [totalPage - 2, totalPage - 1, totalPage];

  const deduplicate = (arr1, arr2) => {
    return arr2.filter((value) => (value > 0 && value <= totalPage && !arr1.includes(value)));
  }

  const deduplicatedCurrent3PagesLeft = deduplicate(first3Pages, current3Pages);
  const deduplicatedCurrent3Pages = deduplicate(last3Pages, deduplicatedCurrent3PagesLeft);
  const deduplicatedLast3Pages = deduplicate(first3Pages, last3Pages);

  var paginationBtns = [
    ...first3Pages,
  ];

  if (deduplicatedCurrent3Pages.length > 0) {
    paginationBtns.push("...");
    paginationBtns.push(...deduplicatedCurrent3Pages);
  }

  if (deduplicatedLast3Pages.length > 0) {
    paginationBtns.push("...");
    paginationBtns.push(...deduplicatedLast3Pages);
  }

  if ((paginationBtns.length > totalPage) && !paginationBtns.includes("...")) {
    paginationBtns = paginationBtns.slice(0, totalPage);
  }

  return (
      <div>
      <div className="paginationArea">
        <a className="paginationBtn" name="currentPage" href='' onClick={() => handlePagination(1)}>&laquo;</a>
        <a className="paginationBtn" name="currentPage" href='' onClick={() => handlePagination(currentPage - 1)}>&lsaquo;</a>
        {
          paginationBtns.map((btn, index) => {
            if (btn === "...") {
              return (
                <a key={index} className="paginationBtnSearch" href='' value={btn} >{btn}</a>
              )
            } else if (btn === currentPage) {
              return (
                <a key={index} className="paginationBtnActive" href='' value={btn}>{btn}</a>
              )
            } else {
              return (
                <a key={index} className="paginationBtn" name="currentPage" href='' value={btn} onClick={() => handlePagination(btn)}>{btn}</a>
              )
            }
          })
        }
        <a className="paginationBtn" name="currentPage" href='' onClick={() => handlePagination(currentPage + 1)}>&rsaquo;</a>
        <a className="paginationBtn" name="currentPage" href='' onClick={() => handlePagination(totalPage)}>&raquo;</a>
      </div>
      <div className="currentPageState">
        {/* <span>1-5 of 10</span> */}
        <span>{(currentPage-1)*paginationInfo.booksPerPage+1}-{currentPage*paginationInfo.booksPerPage+1} of {paginationInfo.totalBooks}</span>
      </div>
    </div>
  )
}

export default Pagination;
