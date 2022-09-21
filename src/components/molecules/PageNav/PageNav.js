import { useEffect, useState } from "react";
import { StyledButton } from "styles/components";
import StyledPageNav from "./StyledPageNav";
import PropTypes from "prop-types";
import uuid from "react-uuid";

const PageNav = ({
  currentPage,
  goToNext,
  goToPrevious,
  allPages,
  visibleRange,
}) => {
  const [start, setStart] = useState(0);

  const pageOnRange = Math.ceil(visibleRange / 2);

  useEffect(() => {
    if (currentPage - pageOnRange < 1) {
      setStart(0);
      return;
    }
    if (currentPage + pageOnRange > allPages) {
      setStart(allPages - visibleRange);
      return;
    }
    setStart(currentPage - pageOnRange);
  }, [currentPage]);

  const goToPage = (index) => {
    if (index === currentPage || index < 1 || index > allPages) return;

    const diff = Math.abs(currentPage - index);
    const increasePage = index > currentPage;

    if (increasePage) goToNext(diff);
    else goToPrevious(diff);
  };

  const pages = [];
  const range = allPages > visibleRange ? visibleRange + start : allPages;

  for (let index = start + 1; index <= range; index++) {
    pages.push(
      <span
        key={uuid()}
        onClick={goToPage.bind(null, index, currentPage)}
        className={index == currentPage ? "current-page" : undefined}
      >
        {index}
      </span>
    );
  }

  return (
    <StyledPageNav>
      <StyledButton
        disabled={currentPage === 1}
        onClick={goToPrevious.bind(null, 1)}
      >
        Prev
      </StyledButton>
      <span className="pages">{pages}</span>
      <StyledButton
        disabled={currentPage === allPages || allPages === 0}
        onClick={goToNext.bind(null, 1)}
      >
        Next
      </StyledButton>
    </StyledPageNav>
  );
};

PageNav.propTypes = {
  currentPage: PropTypes.number.isRequired,
  goToNext: PropTypes.func.isRequired,
  goToPrevious: PropTypes.func.isRequired,
  allPages: PropTypes.number.isRequired,
  visibleRange: PropTypes.number.isRequired,
};

export default PageNav;
