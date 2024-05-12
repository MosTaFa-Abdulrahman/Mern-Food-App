import "./pagination.css";

function Pagination({ currentPage, itemsPerPage, totalItems, paginate }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className={currentPage === number ? "active" : ""}>
            <button
              onClick={() => paginate(number)}
              style={{
                marginRight: "5px",
                padding: "5px",
                backgroundColor: "teal",
                color: "white",
                cursor: "pointer",
                borderRadius: "5px",
                width: "40px",
              }}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
