import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";

import "../../utilities.css";
import "./CreateRequest.css";
import { get, post } from "../../utilities";
import "./EditAccount.css";

const initialValues = {
  item: "",
  enterItem: "", // for user to enter own item
  description: "",
  type: "",
  time: "",
};

const CreateRequest = (props) => {
  if (!props.userId) {
    return <div className="requests-container requests-item">log in to create a request!</div>;
  }

  const [user, setUser] = useState();
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    get("/api/user", { userid: props.userId }).then((userObj) => {
      setUser(userObj);
    });
  }, []);
    
  // ensures user has entered all info in before accessing page
  if (!user || !user.username || !user.kerb || !user.contactMethod1 || !user.contactDetails1 ||
    !user.contactMethod2 || !user.contactDetails2 || !user.location) {
      return (
        <div className="requests-container requests-item">
          enter all account info before creating requests!
        </div>
      );
    };

  const handleItemChange = (event) => {
    const prompt = event.target.value;
    setValues({ ...values, item: prompt });
  };

  const handleEnterItemChange = (event) => {
    const prompt = event.target.value;
    setValues({ ...values, enterItem: prompt });
  };

  const handleDescriptionChange = (event) => {
    const prompt = event.target.value;
    setValues({ ...values, description: prompt });
  };

  const handleTypeChange = (event) => {
    const prompt = event.target.value;
    setValues({ ...values, type: prompt });
  };

  const handleTimeChange = (event) => {
    const prompt = event.target.value;
    setValues({ ...values, time: prompt });
  };

  const handleSubmit = (event) => {
    if (values.item !== "" && values.description !== "" && values.type !== "" && values.time !== "") {
      event.preventDefault();
      // if user chose to enter own item, set values.item to be that item
      if (values.item === "other") {
        values.item = values.enterItem;
      }
      // const body = { creator: props.userId, name: values.item, description: values.description, type: values.type, time: values.time };
      const body = { creator: props.userId, content: values };
      post("/api/request", body).then((requestObj) => {
        setValues(initialValues);
        navigate('/requests/match')
      });
    }
  };

  const handleBadSubmit = (event) => {
    event.preventDefault();
  };

  const itemOptions = ["", "batteries", "tape", "mug", "chair", "other"];

  return (
    <div style={{ padding: "0px 50px" }}>
      <p className="page-title">
        create a<br />
        request
      </p>
      <div className="createrequest-container">
        <p className="request-label">select an item below:</p>
        <form>
          <select
            prompt={values.item}
            onChange={handleItemChange}
            name="item"
            className="createrequest-box"
            style={{ backgroundColor: "var(--purple)" }}
          >
            {itemOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {/* only shows this box if other is selected */}
          {values.item === "other" && (
            <>
              <p className="request-label">or enter your own item:</p>
              <input
                prompt={values.enterItem}
                onChange={handleEnterItemChange}
                type="text"
                placeholder="a succulent"
                className="createrequest-box"
              />
            </>
          )}
          <p className="request-label">add a brief description:</p>
          <input
            prompt={values.description}
            onChange={handleDescriptionChange}
            type="text"
            placeholder="include specifications such as number, size, and more"
            className="createrequest-box"
          />
          <p className="request-label">type of request:</p>
          <select
            prompt={values.type}
            onChange={handleTypeChange}
            name="type"
            className="createrequest-box"
            style={{ backgroundColor: "var(--blue)" }}
          >
            <option value="select"></option>
            <option value="buy">buy</option>
            <option value="trade">trade</option>
            <option value="borrow">borrow</option>
          </select>
          <p className="request-label">time needed by: </p>
          <select
            prompt={values.time}
            name="time"
            className="createrequest-box"
            style={{ backgroundColor: "var(--yellow)" }}
            onChange={handleTimeChange}
          >
            <option value="select"></option>
            <option value="hour">within 1 hour</option>
            <option value="day">within 1 day</option>
            <option value="week">within 1 week</option>
            <option value="weeks">within 2 weeks</option>
            <option value="month">within 1 month</option>
          </select>
          <button
            type="submit"
            className="createrequest-submit"
            value="Submit"
            style={{ backgroundColor: "var(--green)" }}
            onClick={handleSubmit}
          >
              submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRequest;
