import Dollar from "components/atoms/Dollar/Dollar";
import InputSubmit from "components/atoms/InputSubmit/InputSubmit";
import { errorMessages } from "lib/consts/consts";
import { useCartContext } from "lib/contexts/cartContext";
import { cartFormDataShape } from "lib/proptypes/proptypes";
import FormError from "../FormError/FormError";
import StyledPurchaseForm from "./StyledPurchaseForm";
import PropTypes from "prop-types";

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
          id={"amountOfCoin"}
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
          id={"expenseInDollars"}
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
          id={"description"}
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
        {!hasUserEnoughMoney && !error.isError && isAuthenticated ? (
          <FormError error={new Error(errorMessages.noMoney)} />
        ) : null}
      </div>
      <div>
        <label for={"button"} />
        <InputSubmit
          id={"button"}
          disabled={pending}
          value={isAuthenticated ? "Buy" : "Register to buy"}
        />
      </div>
    </StyledPurchaseForm>
  );
};

PurchaseForm.propTypes = {
  formData: cartFormDataShape,
  handleChange: PropTypes.func.isRequired,
  preventKeyDown: PropTypes.func.isRequired,
};

export default PurchaseForm;
