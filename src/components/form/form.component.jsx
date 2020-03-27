import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import { formSchema } from "./formSchema";
import { sizeInputs, sauceInputs, toppingInputs } from "./formInputs";

const Form = () => {
  const [formValues, setFormValues] = useState({
    size: "",
    sauce: "",
    specialInstructions: ""
  });
  const [errors, setErrors] = useState({
    size: "",
    sauce: "",
    specialInstructions: "",
    Pepperoni: "",
    Sausage: "",
    CanadianBacon: "",
    SpicyItalianSausage: "",
    GarlicChicken: "",
    Onions: "",
    GreenPepper: "",
    DicedTomatos: "",
    BlackOlives: "",
    RoastedGarlic: "",
    ArtichokeHearts: "",
    ThreeCheese: "",
    Pinapple: "",
    ExtraCheese: ""
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  //useEffect to check if form is valid
  useEffect(() => {
    formSchema.isValid(formValues).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formValues]);
  //handle validations
  const validateChange = event => {
    const { name } = event.target;
    yup
      .reach(formSchema, event.target.name)
      .validate(event.target.value)
      .then(valid => {
        setErrors({
          ...errors,
          [name]: ""
        });
      })
      .catch(err => {
        setErrors({
          ...errors,
          [name]: err.errors[0]
        });
      });
  };

  //handleChange
  const handleChange = event => {
    event.persist();
    const { name, value } = event.target;
    const newFormData = {
      ...formValues,
      [name]: event.target.type === "checkbox" ? event.target.checked : value
    };
    validateChange(event);
    setFormValues(newFormData);
  };

  //handle submit
  const handleSubmit = event => {
    event.preventDefault();
    console.log(formValues);
  };
  //render select
  const renderSelectOptions = () => {
    return sizeInputs.map((size, indx) => {
      return (
        <option value={size} key={indx}>
          {size}
        </option>
      );
    });
  };
  //render radio options
  const renderRadioOptions = () => {
    return sauceInputs.map((choice, indx) => {
      return (
        <span key={indx}>
          <input
            name="sauce"
            type="radio"
            value={choice}
            onChange={handleChange}
          />
          {choice}
        </span>
      );
    });
  };

  //render checkbox
  const renderCheckbox = () => {
    return toppingInputs.map((topping, indx) => {
      return (
        <span key={indx}>
          <input
            type="checkbox"
            name={topping.name}
            onChange={handleChange}
            value={topping.value}
          />
          {topping.name}
        </span>
      );
    });
  };
  return (
    <div className="form-page">
      <h3>Build your pizza</h3>
      <form className="form-wrapper" onSubmit={handleSubmit}>
        <label htmlFor="size">
          <h4>Choice of size</h4>
          <p>Required</p>
          <select name="size" id="size" onChange={handleChange}>
            {renderSelectOptions()}
          </select>
        </label>
        <label htmlFor="sauce">
          <h4>Choice of Sace</h4>
          <p>Required</p>
          {renderRadioOptions()}
        </label>
        <label htmlFor="toppings">
          <h4>Add Toppings</h4>
          <p>Choose them all</p>
          {renderCheckbox()}
        </label>
        <label htmlFor="specialInstructions">
          <h4>Special Instructions</h4>
          <input
            type="textarea"
            name="specialInstructions"
            value={formValues.specialInstructions}
            onChange={handleChange}
            placeholder="Anything else you would like to add?"
          />
          {errors["specialInstructions"].length > 0 ? (
            <p data-cy={`error-specialInstructions`} className="error">
              {errors["specialInstructions"]}
            </p>
          ) : null}
        </label>
        <div className="btn-wrapper">
          <button disabled={buttonDisabled}>Add to order</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
