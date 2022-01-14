import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./CreateRequest.css";

const CreateRequest = () => {
  return (
    <div style = {{padding:"0px 50px"}}>
      <p className="page-title">create a<br/>request</p>
      <div className="createrequest-container">
        <p className="request-label">select an item below:</p>
        <p>
          <select
            name="item"
            className="createrequest-box"
            style={{backgroundColor: "var(--purple)"}}
          >
            <option value="batteries">batteries</option>
            <option value="other">other</option>
          </select>
        </p>
        <p className="request-label">or enter your item:</p>
        <p>
          <input
            type="text"
            placeholder="a succulent"
            //onChange={handleChange}
            className="createrequest-box"
          />
        </p>
        <p className="request-label">add a brief description:</p>
        <p>
          <input
            type="text"
            placeholder="include specifications such as number, size, and more"
            //onChange={handleChange}
            className="createrequest-box"
          />
        </p>
        <p className="request-label">type of request:</p>
        <p>
          <select
            name="type"
            className="createrequest-box"
            style={{backgroundColor: "var(--blue)"}}
          >
            <option value="buy">buy</option>
            <option value="trade">trade</option>
            <option value="borrow">borrow</option>
          </select>
        </p>
        <p className="request-label">time needed by: </p>
        <p>
          <select
            name="time"
            className="createrequest-box"
            style={{backgroundColor: "var(--yellow)"}}
          >
            <option value="hour">within 1 hour</option>
            <option value="day">within 1 day</option>
            <option value="week">within 1 week</option>
            <option value="weeks">within 2 weeks</option>
            <option value="month">within 1 month</option>
          </select>
        </p>
        <button
          type="submit"
          className="createrequest-submit"
          value="Submit"
          style={{
            backgroundColor: "var(--green)",
          }}
          // onClick={handleSubmit}
        >
          submit
        </button>
      </div>
    </div>
  );
};

export default CreateRequest;