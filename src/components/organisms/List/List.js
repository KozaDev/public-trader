import { StyledCard } from "styles/components";
import Link from "next/link";
import PropTypes from "prop-types";
import uuid from "react-uuid";
import StyledList from "./StyledList";

const List = ({
  Component,
  data,
  params,
  listTitle,
  emptyInfo,
  linkEachTo,
}) => {
  if (!data.length)
    return (
      <StyledList>
        <h4 className="grey-header">{emptyInfo}</h4>
      </StyledList>
    );

  if (linkEachTo)
    return (
      <StyledList hover={true}>
        <h2>{listTitle}</h2>
        <ul>
          {data.map((item) => (
            <li key={uuid()}>
              <Link href={linkEachTo({ ...item, ...params })}>
                <StyledCard>
                  <Component {...item} {...params} />
                </StyledCard>
              </Link>
            </li>
          ))}
        </ul>
      </StyledList>
    );

  return (
    <StyledList>
      <h2>{listTitle}</h2>
      <ul>
        {data.map((item) => (
          <li key={uuid()}>
            <StyledCard>
              <Component {...item} {...params} />
            </StyledCard>
          </li>
        ))}
      </ul>
    </StyledList>
  );
};

List.propTypes = {
  Component: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  params: PropTypes.object,
  listTitle: PropTypes.string,
  emptyInfo: PropTypes.string,
  linkEachTo: PropTypes.func,
};

export default List;
