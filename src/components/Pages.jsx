import React from 'react'

const Pages = props => {

  const { updatePageNumber, totalPages, currentPage } = props;

  const handlePage = (value) => {
    return () => {
      updatePageNumber(value)
    }
  }

  return (<nav className="" aria-label="Page navigation example">
    <ul className="pagination">
      <li className="page-item">
        <button className="page-link" onClick={handlePage(-1)}>Previous</button>
      </li>
      <li className="page-item">
        <div className="px-3 py-2 text-secondary">{currentPage}/{totalPages}</div>
      </li>
      <li className="page-item">
        < button className="page-link" onClick={handlePage(1)}>Next</button>
      </li>
    </ul>
  </nav>)
}

export default Pages