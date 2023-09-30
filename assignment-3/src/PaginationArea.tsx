import { useContext } from 'react';

import {
  ListVisibleBooksContext,
  PaginationContext,
  PaginationContextType,
  SearchContext,
} from './Context';
import { getBooksByPage, storePaginationConfigToLocalStorage } from './Utils';

function PaginationArea() {
  const { paginationInfo, setPaginationInfo } =
    useContext<PaginationContextType>(PaginationContext);
  const { setBookData } = useContext(ListVisibleBooksContext);
  const { searchTerm } = useContext(SearchContext);

  let totalPage = Math.round(
    paginationInfo.totalBooks / paginationInfo.booksPerPage,
  );
  if (paginationInfo.totalBooks / paginationInfo.booksPerPage > totalPage) {
    totalPage += 1;
  }

  const { currentPage } = paginationInfo;

  const handlePagination = async (currentPage: number) => {
    if (currentPage < 1 || currentPage > totalPage) {
      return;
    }

    const pagination = {
      ...paginationInfo,
      currentPage,
    };

    const { data, totalBooks } = getBooksByPage(pagination, searchTerm);
    setBookData(data as never[]);

    pagination.totalBooks = totalBooks;
    setPaginationInfo(pagination);
    storePaginationConfigToLocalStorage(pagination);
  };

  const first3Pages = [1, 2, 3];
  const current3Pages = [currentPage - 1, currentPage, currentPage + 1];
  const last3Pages = [totalPage - 2, totalPage - 1, totalPage];

  const deduplicate = (arr1: number[], arr2: number[]) => {
    return arr2.filter(
      (value) => value > 0 && value <= totalPage && !arr1.includes(value),
    );
  };

  const deduplicatedCurrent3PagesLeft = deduplicate(first3Pages, current3Pages);
  const deduplicatedCurrent3Pages = deduplicate(
    last3Pages,
    deduplicatedCurrent3PagesLeft,
  );
  const deduplicatedLast3Pages = deduplicate(first3Pages, last3Pages);

  let paginationBtns = [...first3Pages.map((page) => page.toString())];

  if (deduplicatedCurrent3Pages.length > 0) {
    paginationBtns.push('...');
    paginationBtns.push(
      ...deduplicatedCurrent3Pages.map((page) => page.toString()),
    );
  }

  if (deduplicatedLast3Pages.length > 0) {
    paginationBtns.push('...');
    paginationBtns.push(
      ...deduplicatedLast3Pages.map((page) => page.toString()),
    );
  }

  if (paginationBtns.length > totalPage && !paginationBtns.includes('...')) {
    paginationBtns = paginationBtns.slice(0, totalPage);
  }

  return (
    <div>
      <div className="paginationArea">
        <button
          className="paginationBtn"
          data-name="currentPage"
          onClick={() => handlePagination(1)}
        >
          &laquo;
        </button>
        <button
          className="paginationBtn"
          data-name="currentPage"
          onClick={() => handlePagination(currentPage - 1)}
        >
          &lsaquo;
        </button>
        {paginationBtns.map((btn, index) => {
          if (btn === '...') {
            return (
              <button
                key={index}
                className="paginationBtnSearch"
                data-value={btn}
              >
                {btn}
              </button>
            );
          }
          if (btn === currentPage.toString()) {
            return (
              <button
                key={index}
                className="paginationBtnActive"
                data-value={btn}
              >
                {btn}
              </button>
            );
          }
          return (
            <button
              key={index}
              className="paginationBtn"
              data-name="currentPage"
              data-value={btn}
              onClick={() => {
                const page = parseInt(btn, 10);
                return handlePagination(page);
              }}
            >
              {btn}
            </button>
          );
        })}
        <button
          className="paginationBtn"
          data-name="currentPage"
          onClick={() => handlePagination(currentPage + 1)}
        >
          &rsaquo;
        </button>
        <button
          className="paginationBtn"
          data-name="currentPage"
          onClick={() => handlePagination(totalPage)}
        >
          &raquo;
        </button>
      </div>
      <div className="currentPageState">
        {/* <span>1-5 of 10</span> */}
        <span>
          {(currentPage - 1) * paginationInfo.booksPerPage + 1}
          -
          {currentPage * paginationInfo.booksPerPage + 1}
          {' '}
          of
          {' '}
          {paginationInfo.totalBooks}
        </span>
      </div>
    </div>
  );
}

export default PaginationArea;
