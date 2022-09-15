import styled from "styled-components";

const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  display: none;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ expanded }) => (expanded ? "#ccc" : "#333")};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({ expanded }) =>
        expanded ? "rotate(45deg)" : "rotate(0)"};
    }
    &:nth-child(2) {
      transform: ${({ expanded }) =>
        expanded ? "translateX(100%)" : "translateX(0)"};
      opacity: ${({ expanded }) => (expanded ? 0 : 1)};
    }
    &:nth-child(3) {
      transform: ${({ expanded }) =>
        expanded ? "rotate(-45deg)" : "rotate(0)"};
    }
  }
`;
export default StyledBurger;
