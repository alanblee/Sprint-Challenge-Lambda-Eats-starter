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
    specialInstructions: ""
  });

  //handleChange
  const handleChange = event => {
    console.log(event.target.value);
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
        <label htmlFor="specialInstructions">
          <h4>Special Instructions</h4>
          <input
            type="textarea"
            name="specialInstructions"
            value={formValues.specialInstructions}
            onChange={handleChange}
            placeholder="Anything else you would like to add?"
          />
        </label>
        <div className="btn-wrapper">
          <button>Add to order</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
