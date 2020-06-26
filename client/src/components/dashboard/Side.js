import React, { useState } from "react";
import LeaderBoard from "./LeaderBoard";
import GameLog from "./GameLog";
import History from "./History";
import Rules from "./rules";



// import Leaflet from "./map";
// import Menu from "./menu";
// import Side from ".side";
function Side() {
    const [side, setSide] = useState("");
    // switch (side) {
    //     case "gamelog":
    //         return <GameLog />
    //     case "leaderboard":
    //         return <Leaderboard />
    //     case "history":
    //         return <History />
    // };
    return (
        <div className={"side-container"}>
            <div className={"side-nav"}>
                <input
                    type={"button"}
                    className={"side-btn btn-primary gamelog"}
                    value={""}
                    onClick={() => setSide("gamelog")}
                />
                <input
                    type={"button"}
                    className={"side-btn btn-primary leaderboard"}
                    value={""}
                    onClick={() => setSide("leaderboard")}
                />
                <input
                    type={"button"}
                    className={"side-btn btn-primary history"}
                    value={""}
                    onClick={() => setSide("history")}
                />
                <input
                    type={"button"}
                    className={"side-btn btn-primary rule"}
                    value={""}
                    onClick={() => setSide("rules")}
                />
            </div>
            <div>{side === "gamelog" ? <GameLog /> : ""}</div>
            <div>{side === "leaderboard" ? <LeaderBoard /> : ""}</div>
            <div>{side === "history" ? <History /> : ""}</div>
            <div>{side === "rules" ? <Rules /> : ""}</div>

        </div>
    );
}
export default Side;