import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import axios from "axios";
import * as yup from "yup";
import { formSchema } from "./formSchema";
import { sizeInputs, sauceInputs, toppingInputs } from "./formInputs";
import "./form.css";

const useStyles = makeStyles(theme => ({
  modal: {
    overflow: "scroll",
    margin: "1% 10%"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(0, 4, 3),
    width: "100%"
  }
}));

const Form = () => {
  //modal
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //form states
  const [formValues, setFormValues] = useState({
    orderFor: "",
    size: "X-Small",
    sauce: "",
    specialInstructions: ""
  });
  const [errors, setErrors] = useState({
    orderFor: "",
    size: "",
    sauce: "",
    specialInstructions: ""
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [pizza, setPizza] = useState([]);
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
    //POST request
    axios
      .post("https://reqres.in/api/users", formValues)
      .then(res => {
        setPizza([...pizza, res.data]);
        handleClose();
        //reset form on success
        setFormValues({
          orderFor: "",
          size: "X-Small",
          sauce: "",
          specialInstructions: ""
        });
      })
      .catch(err => console.log(err.response));
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
        <span key={indx} className="sauce-wrapper">
          <input
            name="sauce"
            type="radio"
            value={choice}
            onChange={handleChange}
            data-cy={choice}
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
        <span key={indx} className="topping-wrapper">
          <input
            type="checkbox"
            name={topping.name}
            onChange={handleChange}
            value={topping.name}
            data-cy={topping.name}
          />
          {topping.name}
        </span>
      );
    });
  };
  return (
    <div className="form-page">
      <button type="button" onClick={handleOpen} data-cy="modal-btn">
        CLICK FOR PIZZAA
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h3>Build your pizza</h3>
            <form className="form-wrapper" onSubmit={handleSubmit}>
              <label htmlFor="orderFor">
                Order for
                <input
                  data-cy="orderFor"
                  type="text"
                  name="orderFor"
                  value={formValues.orderFor}
                  onChange={handleChange}
                  placeholder="Provide a name for order"
                />
                {errors["orderFor"].length > 0 ? (
                  <p data-cy={`error-orderFor`} className="error">
                    {errors["orderFor"]}
                  </p>
                ) : null}
              </label>

              <label htmlFor="size">
                <span className="span-select">
                  Choose a size
                  <br />
                </span>
                <span className="required">Required</span>

                <select
                  name="size"
                  id="size"
                  onChange={handleChange}
                  data-cy="size"
                >
                  {renderSelectOptions()}
                </select>
              </label>

              <label htmlFor="sauce" className="sauce">
                <span className="span-select">
                  Choice of Sauce
                  <br />
                </span>
                <span className="required">Required</span>

                {renderRadioOptions()}
              </label>

              <label htmlFor="toppings" className="topping">
                <span className="span-select">
                  Add Toppings
                  <br />
                </span>
                <span className="required">Pro tip: choose all of them</span>
                {renderCheckbox()}
              </label>

              <label htmlFor="specialInstructions">
                Special Instructions
                <input
                  type="textarea"
                  name="specialInstructions"
                  value={formValues.specialInstructions}
                  onChange={handleChange}
                  placeholder="Anything else you would like to add?"
                  data-cy="specialInstructions"
                />
                {errors["specialInstructions"].length > 0 ? (
                  <p data-cy={`error-specialInstructions`} className="error">
                    {errors["specialInstructions"]}
                  </p>
                ) : null}
              </label>

              <div className="btn-container">
                <button disabled={buttonDisabled} data-cy="form-btn">
                  Add to order
                </button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
      <pre>{JSON.stringify(pizza, null, 2)}</pre>
    </div>
  );
};

export default Form;
