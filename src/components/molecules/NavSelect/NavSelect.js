import Router, { useRouter } from "next/router";
import { walletSchema } from "lib/consts/consts";
import Select from "components/molecules/Select/Select";
import { capitalizeFirstLetter } from "lib/utils/utils";

const NavSelect = ({ toggle }) => {
  const router = useRouter();
  const marketFromUrl = router.query?.market;

  const firstOptionInSelect = {
    title: "Markets",
    attributes: {
      disabled: "disabled",
      selected: !marketFromUrl,
    },
  };

  const selectOptions = walletSchema.reduce(
    (acc, item) => {
      const { key, currency } = item;
      if (key === "usd") return acc;
      return [
        ...acc,
        {
          title: capitalizeFirstLetter(currency),
          value: key,
          attributes: { selected: marketFromUrl === key },
        },
      ];
    },
    [firstOptionInSelect]
  );

  const handleSelectChange = ({ target: { value } }) => {
    Router.push(`/markets/${value}`);
    toggle(false);
  };

  return <Select options={selectOptions} handleChange={handleSelectChange} />;
};

export default NavSelect;
