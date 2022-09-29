import useFetchData from "lib/hooks/useFetchData";
import getBestTraders from "lib/messariApi/getBestTraders";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PageError from "components/templates/PageError/PageError";
import { errorMessages } from "lib/consts/consts";
import List from "components/organisms/List/List";
import TopTradersLabel from "components/atoms/TopTradersLabel/TopTradersLabel";
import { prepareTemplate } from "lib/utils/utils";
import Spinner from "components/templates/Spinner/Spinner";

const TopTraders = () => {
  const router = useRouter();
  const { users } = router.query;
  const [isQueryUndefined, setQuery] = useState(true);
  const { execute, data, error, pending } = useFetchData(null, false);

  useEffect(() => {
    if (users !== undefined) {
      if (Number(users) > 0) execute(getBestTraders.bind(null, users));
      else execute(() => Promise.reject(new Error(errorMessages.notFound)));
      setQuery(false);
    }
  }, [users]);

  const title = users == 1 ? "Best trader" : `Top ${users} traders`;

  if (error.isError) return <PageError error={error.error} />;
  if (pending || isQueryUndefined) return <Spinner margin={"200px 0"} />;

  return (
    <List
      Component={TopTradersLabel}
      data={data}
      listTitle={title}
      emptyInfo={"Currently list of traders is empty"}
      linkEachTo={prepareTemplate`/users/${"id"}`}
    />
  );
};

export default TopTraders;
