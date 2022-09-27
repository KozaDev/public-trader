import axios from "axios";
import Wallet from "components/molecules/Wallet/Wallet";
import Spinner from "components/templates/Spinner/Spinner";
import useFetchData from "lib/hooks/useFetchData";
import getBestTraders from "lib/messariApi/getBestTraders";
import Link from "next/link";
import ComponentError from "../ComponentError/ComponentError";
import StyledBestTrader from "./StyledBestTrader";

const BestTrader = () => {
  const {
    data: bestTraderData,
    error: bestTraderError,
    pending: bestTraderPending,
  } = useFetchData(
    () =>
      getBestTraders(1).then((data) => {
        if (!data.length) return null;
        return axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/${data[0].id}?populate=wallet`
        );
      }),
    true
  );

  if (bestTraderPending)
    return (
      <StyledBestTrader>
        <Spinner margin={"100px 0"} />
      </StyledBestTrader>
    );
  if (bestTraderError.isError)
    return (
      <StyledBestTrader>
        <ComponentError error={bestTraderError.error} />
      </StyledBestTrader>
    );

  if (!bestTraderData) return;

  const {
    username,
    id,
    wallet: { assets },
  } = bestTraderData.data;

  return (
    <StyledBestTrader>
      <h1>{"The best trader"}</h1>

      <Link href={`/users/${id}`}>
        <h3 className="title">
          {"#1 "}
          {username}
        </h3>
      </Link>
      <Wallet assets={assets} />
    </StyledBestTrader>
  );
};

export default BestTrader;
