import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";

import "../../utilities.css";
import "./Fulfill.css";
import Modal from "react-modal";

import SearchBar from "../modules/SearchBar.js";

let colors = ["var(--purple)", "var(--blue)", "var(--yellow)", "var(--green)"];
let i = 0;

function Box(props) {
  const [reqCreator, setReqCreator] = useState();
  const [PopUp, setPopUp] = useState(false);

  const handleClose = () => setPopUp(false);
  const handleOpen = () => setPopUp(true);
  useEffect(() => {
    get("/api/user", { userid: props.creator }).then((userObj) => {
      setReqCreator(userObj);
    });
  }, []);

  // const handleFulfill = (event) => {
  //   event.preventDefault();
  //   const body = { reqId: props.reqId, creatorId: props.userId };
  //   post("/api/updateRequest", body).then((result) => {
  //     console.log("result", result);
  //   });
  // };

  //console.log("hihi", reqCreator);
  i = (i + 1) % colors.length;
  return (
    <div
      className="fulfill-item-box"
      style={{ backgroundColor: colors[props.index % colors.length] }}
    >
      <div className="fulfill-item-box-inner">
        <div className="fulfill-item-box-front">
          {/* front side */}
          <b>item:</b> {props.item} <br />
          <br />
          <br />
          <b style={{ textDecoration: "underline" }}>
            {!reqCreator ? "" : "@" + reqCreator.username}
          </b>
          <br />
          <br />
          <br />
          {props.type}
          <br />
          {/*<button
            type="resolve"
            className="requestmatch-resolve"
            value="Resolve"
            style={{
              backgroundColor: "#E5E5E5",
            }}
            // onClick={handleLearn}
          >
            learn more
          </button>*/}
        </div>
        <div className="fulfill-item-box-back">
          {/* back side */}
          <b>item:</b> {props.item} <br />
          <b>description:</b> {props.description} <br />
          <br />
          <br />
          <br />
          <button
            className="requestmatch-resolve"
            style={{ backgroundColor: "var(--white)", fontWeight: "bold", width: "auto" }}
            onClick={handleOpen}
          >
            {!reqCreator ? "" : "@" + reqCreator.username}
          </button>
          <Modal className="modal" isOpen={PopUp} ariaHideApp={false}>
            <div
              style={{ backgroundColor: colors[props.index % colors.length], borderRadius: "24px" }}
            >
              <button className="modal-close" onClick={handleClose}>
                ✘
              </button>
              <div className="modal-content">
                {reqCreator && (
                  <div>
                    <p className="modal-title" style={{ textDecoration: "underline" }}>
                      {"@" + reqCreator.username}
                    </p>
                    <p>
                      {" "}
                      name: <i>{reqCreator.name}</i>
                    </p>
                    <p>
                      {" "}
                      {reqCreator.contactMethod1}: <i>{reqCreator.contactDetails1}</i>{" "}
                    </p>
                    <p>
                      {" "}
                      {reqCreator.contactMethod2}: <i>{reqCreator.contactDetails2}</i>{" "}
                    </p>
                    <p>
                      {" "}
                      location: <i>{reqCreator.location}</i>{" "}
                    </p>
                    <br />
                  </div>
                )}
              </div>
            </div>
          </Modal>
          <br />
          <br />
          <button
            type="resolve"
            className="requestmatch-resolve"
            value="Resolve"
            // onClick={handleFulfill}
          >
            claim
          </button>
        </div>
      </div>
    </div>
  );
}

const Explore = (props) => {
  if (!props.userId) {
    return <div className="requests-container requests-item">log in to explore items!</div>;
  }

  const [user, setUser] = useState();
  const [listings, setListings] = useState([]);
  useEffect(() => {
    get("/api/user", { userid: props.userId }).then((userObj) => {
      setUser(userObj);
      get("/api/allListings", {}).then((itemObjs) => {
        setListings(itemObjs);
      });
    });
  }, []);

  // ensures user has entered all info in before accessing page
  if (
    !user ||
    !user.username ||
    !user.kerb ||
    !user.contactMethod1 ||
    !user.contactDetails1 ||
    !user.contactMethod2 ||
    !user.contactDetails2 ||
    !user.location
  ) {
    return (
      <div className="requests-container requests-item">
        enter all account info before exploring items!
      </div>
    );
  }

  const { search } = window.location;
  const query = new URLSearchParams(search).get("s");

  const filterItems = (items, query) => {
    if (!query) {
      return items;
    }
    return items.filter((item) => {
      //console.log(req);
      //const reqLower = req.name.toLowerCase();
      return (
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
    });
  };

  let listingsList = null;
  const hasListings = listings.length !== 0;
  if (hasListings) {
    const timeOrder = ["hour", "day", "week", "weeks", "month"];
    listings.sort(function (a, b) {
      let time1 = timeOrder.findIndex((time) => time === a.time);
      let time2 = timeOrder.findIndex((time) => time === b.time);
      if (time1 < time2) {
        return -1;
      }
      if (time1 > time2) {
        return 1;
      }
      return 0;
    });
    const filteredItems = filterItems(listings, query);
    if (filteredItems.length !== 0) {
      listingsList = filteredItems.map((itemObj, i) => (
        <Box
          key={`Box_${itemObj._id}`}
          creator={itemObj.creator}
          item={itemObj.name}
          description={itemObj.description}
          type={itemObj.type}
          index={i}
          // reqId={requestObj._id}
          userId={props.userId}
        />
      ));
    } else {
      listingsList = <div>no listings!</div>;
    }
  } else {
    listingsList = <div>no listings!</div>;
  }

  return (
    <>
      <div style={{ padding: "0px 50px" }}>
        <SearchBar action="/explore/" />
        <div className="fulfill-container">{listingsList}</div>
      </div>
    </>
  );
};

export default Explore;
