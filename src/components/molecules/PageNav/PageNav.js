import { useEffect, useState } from "react";
import { StyledButton } from "styles/components";
import StyledPageNav from "./StyledPageNav";

const PageNav = ({ currentPage, goToNext, goToPrevious, allPages }) => {
  const pages = [];
  for (let index = 1; index <= allPages; index++) {
    pages.push(
      <span className={index == currentPage && "current-page"}>{index}</span>
    );
  }

  const [start, setStart] = useState(0);

  useEffect(() => {
    if (currentPage == 1 || currentPage == 2) {
      setStart(0);
      return;
    }
    if (allPages - 2 < currentPage) {
      setStart(allPages - 3);
      return;
    }
    setStart(currentPage - 2);
  }, [currentPage]);

  const next = () => {
    goToNext();
    if (currentPage == 1 || start + 4 > allPages) return;
    setStart((state) => state + 1);
  };

  const prev = () => {
    goToPrevious();
    if (start < 1 || start < currentPage - 2) return;
    setStart((state) => state - 1);
  };

  return (
    <StyledPageNav>
      <StyledButton disabled={currentPage === 1} onClick={prev}>
        Prev
      </StyledButton>
      <span className="pages">{pages.splice(start, 3)}</span>
      <StyledButton
        disabled={currentPage === allPages || allPages === 0}
        onClick={next}
      >
        Next
      </StyledButton>
    </StyledPageNav>
  );
};

export default PageNav;
