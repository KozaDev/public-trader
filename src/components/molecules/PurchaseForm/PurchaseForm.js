import { StyledFrom } from "styles/components";

const PurchaseForm = ({ formData, handleChange, buyCurrency }) => {
  const exceptThisSymbols = ["e", "E", "+", "-"];
  return (
    <StyledFrom onSubmit={buyCurrency}>
      <div>
        <h3>Amount of coin</h3>
        <input
          type={"number"}
          name={"amountOfCoin"}
          value={formData.amountOfCoin}
          onKeyDown={(e) =>
            exceptThisSymbols.includes(e.key) && e.preventDefault()
          }
          onChange={handleChange}
          autoComplete="off"
          required
        ></input>
      </div>
      <div>
        <h3>Expense in dolars</h3>
        <input
          type={"number"}
          name={"expenseInDollars"}
          value={formData.expenseInDollars}
          onKeyDown={(e) =>
            exceptThisSymbols.includes(e.key) && e.preventDefault()
          }
          onChange={handleChange}
          autoComplete="off"
          required
        ></input>
      </div>
      <div>
        <h3>description</h3>
        <input
          type={"text"}
          name={"description"}
          value={formData.description}
          onChange={handleChange}
          autoComplete="off"
          required
        ></input>
      </div>
      <br />
      <input type={"submit"} value={"Buy"} />
    </StyledFrom>
  );
};

export default PurchaseForm;
