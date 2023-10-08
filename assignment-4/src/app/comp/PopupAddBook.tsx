import React, { useContext, useState } from 'react'

import {
  ListVisibleBooksContext,
  OpenAddBookPopupContext,
  PaginationContext,
  SearchContext,
} from './Context'
import {
  addBookToLocalStorage,
  generateNewBookId,
  getBooksByPage,
  storePaginationConfigToLocalStorage,
} from './Utils'

const PopupAddBook = () => {
  const { openAddBookPopup, setOpenAddBookPopup } = useContext(
    OpenAddBookPopupContext,
  )
  const { setBookData } = useContext(ListVisibleBooksContext)
  const { paginationInfo, setPaginationInfo } = useContext(PaginationContext)
  const { searchTerm } = useContext(SearchContext)

  const [formData, setFormData] = useState({
    name: '',
    author: '',
    topic: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newBook = {
      id: generateNewBookId(),
      name: formData.name,
      author: formData.author,
      topic: formData.topic,
    }

    addBookToLocalStorage(newBook)

    const { data, totalBooks } = getBooksByPage(paginationInfo, searchTerm)
    setBookData(data as never[])

    setPaginationInfo((prevPaginationInfo) => ({
      ...prevPaginationInfo,
      totalBooks,
    }))
    storePaginationConfigToLocalStorage(paginationInfo)

    setFormData({
      name: '',
      author: '',
      topic: '',
    })
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  return openAddBookPopup ? (
    <div className="popup-background" id="add-book-popup-bg">
      <div className="popup-form-add-book" id="add-book-popup">
        <form action="" className="form-container" onSubmit={handleSubmit}>
          <h2>Add Book</h2>
          <label htmlFor="add-book-title">
            <b>Name</b>
            <input
              type="text"
              placeholder="Enter Name"
              id="add-book-title"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              required
            />
          </label>
          <label htmlFor="add-book-author">
            <b>Author</b>
            <input
              type="text"
              placeholder="Enter Author"
              id="add-book-author"
              name="author"
              value={formData.author}
              onChange={handleFormChange}
              required
            />
          </label>
          <label htmlFor="add-book-topic">
            <b>Topic</b>
            <select
              id="add-book-topic"
              value={formData.topic}
              name="topic"
              onChange={handleFormChange}
              required
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="Fiction">Fiction</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Science">Science</option>
              <option value="Others">Others</option>
            </select>
          </label>
          <div className="btn-group">
            <button type="submit" className="btn">
              Add
            </button>
            <button
              type="button"
              className="btn-cancel"
              id="cancel-add-book-btn"
              onClick={() => setOpenAddBookPopup(false)}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null
}

export default PopupAddBook
