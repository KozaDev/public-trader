const PageNav = ({ currentPage, goToNext, goToPrevious, allPages }) => {
  return (
    <div>
      <button disabled={currentPage === 1} onClick={goToPrevious}>
        Previous
      </button>
      <button
        disabled={currentPage === allPages || allPages === 0}
        onClick={goToNext}
      >
        Next
      </button>
      <span>{`${currentPage} of ${allPages}`}</span>
    </div>
  );
};

export default PageNav;
