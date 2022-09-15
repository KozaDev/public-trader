import Dollar from "components/atoms/Dollar/Dollar";
import { errorMessages } from "lib/consts/consts";
import { useCartContext } from "lib/contexts/cartContext";
import FormError from "../FormError/FormError";
import StyledPurchaseForm from "./StyledPurchaseForm";

const PurchaseForm = ({ formData, handleChange, preventKeyDown }) => {
  const { pending, error, action, isAuthenticated, usersDollars } =
    useCartContext();

  const hasUserEnoughMoney =
    Number(usersDollars) >= Number(formData.expenseInDollars);

  return (
    <StyledPurchaseForm onSubmit={action}>
      <div>
        <label for={"amountOfCoin"}>Amount of coin</label>
        <input
          type={"number"}
          name={"amountOfCoin"}
          value={formData.amountOfCoin}
          onKeyDown={preventKeyDown}
          onChange={handleChange}
          autoComplete="off"
          required={isAuthenticated}
        ></input>
      </div>
      <div>
        <label for={"expenseInDollars"}>Expense in dolars</label>
        <input
          type={"number"}
          name={"expenseInDollars"}
          value={formData.expenseInDollars}
          onKeyDown={preventKeyDown}
          onChange={handleChange}
          autoComplete="off"
          required={isAuthenticated}
        ></input>
      </div>

      {isAuthenticated && (
        <div>
          <label>
            {"Your dollars: "}{" "}
            <span className={!hasUserEnoughMoney ? "error" : null}>
              <Dollar amount={usersDollars} />
            </span>
          </label>
        </div>
      )}

      <div>
        <label for={"description"}>Description</label>
        <textarea
          type={"text"}
          name={"description"}
          value={formData.description}
          onChange={handleChange}
          autoComplete="off"
          required={isAuthenticated}
          rows="5"
          cols="33"
        ></textarea>
      </div>

      <div>
        {error.isError && <FormError error={error.error} />}
        {!hasUserEnoughMoney && !error.isError ? (
          <FormError error={new Error(errorMessages.noMoney)} />
        ) : null}
      </div>

      <input
        type={"submit"}
        disabled={pending || !hasUserEnoughMoney}
        value={isAuthenticated ? "Buy" : "Register to buy"}
      />
    </StyledPurchaseForm>
  );
};

export default PurchaseForm;
