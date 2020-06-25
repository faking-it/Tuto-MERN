import React, { useState, useEffect } from "react";
import axios from "axios";

export const Actions = (actions) => {
  return Object.values(actions).map(({ name, action, date }, index) => (
    <li key={index}>
      <p>
        {date}
        <br />
        {name} {action}
      </p>
      <hr />
    </li>
  ));
};

function GameLog() {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    let please = [];
    axios.get("/api/side/gamelog").then((response) => {
      response.data.forEach((element) => {
        let date = new Date(element.date);
        let today = new Date();

        // Display hours
        let hour = date.getHours();
        if (hour < 10) {
          hour = "0" + hour;
        }
        // Display minutes
        let min = date.getMinutes();
        if (min < 10) {
          min = "0" + min;
        }
        // Display seconds
        let sec = date.getSeconds();
        if (sec < 10) {
          sec = "0" + sec;
        }

        // Display the day the action took place
        if (today.getDate() - date.getDate() === 0) {
          date = "Today, at " + hour + ":" + min + ":" + sec;
        } else if (today.getDate() - date.getDate() === 1) {
          date = "Yesterday";
        } else {
          date = today.getDate() - date.getDate() + " days ago";
        }

        please.push({
          name: element.name,
          action: element.action,
          date: date
        });
      });
      setActions(please);
    });
  }, []);

  return (
    <div className={"gamelog-container side-child"}>
      <h3>{"Gamelog"}</h3>
      <div className={"log-container"}>
        <ol className={"gamelog-list"}>
          <Actions {...actions} />
        </ol>
      </div>
    </div>
  );
}
export default GameLog;
