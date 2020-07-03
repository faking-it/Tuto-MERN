import * as React from "react";

const Rules = () => (
  <div className={"rules scrollable"}>
    <ul>
      <h5>{"Goal"}</h5>
      <hr className="line"/>

      <li>
        {" "}
        {"The goal is to become the "} <b>{"biggest tree owner in Liege."}</b>{" "}
      </li>

      <h5>{"Rules"}</h5>
      <hr className="line"/>

      <li>
        {" "}
        {"When you joined the adventure, you received"}{" "}
        <b>{"three free trees"}</b> {" and "} <b>{"an amount of leaves "}</b>{" "}
        {"(the Mwenbwa money). These leaves will be used to buy more trees."}{" "}
      </li>
      <li>
        {" "}
        {"Every"} <b>{" 15"}</b> {" minutes you will"} <b>{"receive "}</b>{" "}
        {
          "the number of leaves equal to the value of the trees you own. But beware, every "
        }{" "}
        <b>{"hour"}</b> {" you will "} <b>{"lose"}</b> {" half of your leaves!"}{" "}
      </li>
      <li>
        {" "}
        {
          "A owned tree can be bought back by another player. If you want to "
        }{" "}
        <b>{"lock"}</b> {" your tree, you will have to pay more"}{" "}
      </li>
    </ul>

    <h6> {"good luck!"} </h6>
  </div>
);

export default Rules;
