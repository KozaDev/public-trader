import { useCartContext } from "lib/contexts/cartContext";
import FormError from "../FormError/FormError";

const PurchaseForm = ({ formData, handleChange, preventKeyDown }) => {
  const { pending, error, action, isAuthenticated } = useCartContext();

  return (
    <form onSubmit={action}>
      <div>
        <h3>Amount of coin</h3>
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
        <h3>Expense in dolars</h3>
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
      <div>
        <h3>Description</h3>
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
      <br />
      {error.isError && <FormError error={error.error} />}
      <input
        type={"submit"}
        disabled={pending}
        value={isAuthenticated ? "Buy" : "Register"}
      />
    </form>
  );
};

export default PurchaseForm;
