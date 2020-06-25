import React from "react";
const Owned = (owned) => {

    const Owned2 = Object.values(owned);

    return Owned2.map((element, index) => (
        <li key={index}>
            <p>{element.arbotag} {"owned by :"} {element.owner}</p>
        </li>
    ));

}
export default Owned;