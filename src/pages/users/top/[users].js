import useFetchData from "lib/hooks/useFetchData";
import getBestTraders from "lib/cryptoApi/getBestTraders";
import Link from "next/link";
import { useRouter } from "next/router";
import { StyledCard } from "styles/components";
import { useEffect } from "react";
import PageError from "components/templates/PageError/PageError";
import NumberFormat from "react-number-format";
import { errorMessages } from "lib/consts";

const TopTraders = () => {
  const router = useRouter();
  const { users: amountOfTraders } = router.query;

  const {
    execute,
    data: traders,
    error,
    pending,
  } = useFetchData(getBestTraders.bind(null, Number(amountOfTraders)), false);

  useEffect(() => {
    if (amountOfTraders !== undefined) {
      if (Number(amountOfTraders) > 0) execute();
      else execute(() => Promise.reject({ message: errorMessages.notFound }));
    }
  }, [amountOfTraders]);

  const displayTraders = () => {
    if (error.isError) return <PageError error={error.error} />;
    if (pending) return "loading";
    if (traders)
      return (
        <>
          {traders.length > 0 ? (
            <>
              {amountOfTraders == 1 ? (
                <h1>Best trader</h1>
              ) : (
                <h1>Top {amountOfTraders} traders</h1>
              )}
              <div>
                {traders.map(({ username, id, allAssetsInDollars }) => {
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
          ) : (
            <h2>Currently list of traders is empty</h2>
          )}
        </>
      );
  };

  return <>{displayTraders()}</>;
};

export default TopTraders;
