import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";

import { sizeInputs, sauceInputs, toppingInputs } from "./formInputs";
const Form = () => {
  const [formValues, setFormValues] = useState({
    size: "",
    sauce: "",
    toppings: [],
    glutten: false,
    specialInstrictions: ""
  });

  //handleChange
  const handleChange = event => {
    console.log(event.target);
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
    return sauceInputs.map((sauce, indx) => {
      return (
        <span key={indx}>
          <input
            name="sauce"
            type="radio"
            value={sauce}
            onChange={handleChange}
            checked={formValues.sauce}
          />
          {sauce}
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
            name={topping}
            checked={formValues.toppings[indx]}
            onChange={handleChange}
          />
          {topping}
        </span>
      );
    });
  };
  return (
    <div className="form-page">
      <h3>Build your pizza</h3>
      <form className="form-wrapper">
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
      </form>
    </div>
  );
};

export default Form;
