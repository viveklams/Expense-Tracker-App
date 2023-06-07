import React from "react";

const AppPagination = ({ pageNumber, setPage }) => {
  const arr = Array.from(Array(4).keys());
  console.log(arr);
  return (
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        {arr?.map((p) => (
          <li key={p} className="page-item">
            <button
              onClick={(e) => setPage(e.target.textContent)}
              className="page-link"
            >
              {++p}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AppPagination;
