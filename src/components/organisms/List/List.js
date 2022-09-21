import { StyledCard } from "styles/components";
import Link from "next/link";
import PropTypes from "prop-types";

const List = ({
  Component,
  data,
  params,
  listTitle,
  emptyInfo,
  linkEachTo,
}) => {
  if (!data.length) return <h2>{emptyInfo}</h2>;

  if (linkEachTo)
    return (
      <div>
        <h2>{listTitle}</h2>
        <ul>
          {data.map((item) => (
            <li>
              <Link href={linkEachTo({ ...item, ...params })}>
                <StyledCard>
                  <Component {...item} {...params} />
                </StyledCard>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );

  return (
    <div>
      <h2>{listTitle}</h2>
      <ul>
        {data.map((item) => (
          <li>
            <StyledCard>
              <Component {...item} {...params} />
            </StyledCard>
          </li>
        ))}
      </ul>
    </div>
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
