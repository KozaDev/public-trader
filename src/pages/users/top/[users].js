import useFetchData from "lib/hooks/useFetchData";
import getBestTraders from "lib/cryptoApi/getBestTraders";
import Link from "next/link";
import { useRouter } from "next/router";
import { StyledCard } from "styles/components";
import { useEffect, useState } from "react";
import PageError from "components/templates/PageError/PageError";
import NumberFormat from "react-number-format";
import { errorMessages } from "lib/consts/consts";

const TopTraders = () => {
  const router = useRouter();
  const { users } = router.query;
  const [isUsersUndefined, setUsersState] = useState(true);
  const { execute, data, error, pending } = useFetchData(null, false);

  useEffect(() => {
    if (users !== undefined) {
      if (Number(users) > 0) execute(getBestTraders.bind(null, users));
      else execute(() => Promise.reject({ message: errorMessages.notFound }));
      setUsersState(false);
    }
  }, [users]);

  if (error.isError) return <PageError error={error.error} />;
  if (pending || isUsersUndefined) return "loading";
  if (!data.length) return <h2>Currently list of traders is empty</h2>;
  if (data.length)
    return (
      <>
        {users == 1 ? <h1>Best trader</h1> : <h1>Top {users} traders</h1>}
        <div>
          {data.map(({ username, id, allAssetsInDollars }) => {
            return (
              <Link key={id} href={`/users/${id}`}>
                <StyledCard>
                  {username}, wallet:{" "}
                  <NumberFormat
                    value={allAssetsInDollars}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </StyledCard>
              </Link>
            );
          })}
        </div>
      </>
    );
};

export default TopTraders;
