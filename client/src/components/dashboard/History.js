import React, { useState, useEffect } from "react";
import axios from 'axios';
import Free from './free';
import Owned from './owned';
function History() {
    const [owned, setOwned] = useState([]);
    const [free, setFree] = useState([]);
    useEffect(() => {
        let please = [];
        axios
            .get("/api/side/freetree")
            .then((response) => {
                const data = response.data;
                data.forEach(element => {
                    console.log(element);
                    // const name = element.name;
                    please.push(element);
                    // console.log(please.length);
                });
                // if (please.length > 9) {

                setFree(please);

                // }
            });



    }, []);
    useEffect(() => {
        let please = [];
        axios
            .get("/api/side/Ownedtree")
            .then((response) => {
                const data = response.data;
                data.forEach(element => {
                    console.log(element);
                    // const name = element.name;
                    please.push(element);
                    // console.log(please.length);
                });
                // if (please.length > 9) {

                setOwned(please);

                // }
            });



    }, []);
    const [history, setHistory] = useState("");
    console.log(free);
    console.log(owned);
    return (


        <div className={"sidecontent-container side-child history-component"}>
            <h3>{"List of trees"}</h3>
            <div className={"history-nav"}>
                <input
                    type={"button"}
                    className={" btn-primary btn-history"}
                    value={"Free"}
                    onClick={() => setHistory("free")}
                />
                <input
                    type={"button"}
                    className={" btn-primary btn-history"}
                    value={"Owned"}
                    onClick={() => setHistory("owned")}
                />

            </div>
            <div className={"history-container"}>

                {history === "free" ?
                    <div className={"free-container"}>
                        <h3>{"Free trees"}</h3>
                        <ul className={"free scrollable"}>
                            <Free {...free} />
                        </ul>

                    </div>
                    : ""}
                {history === "owned" ? <div className={"free-container"}>
                    <h3>{"owned trees"}</h3>
                    <ul className={"owned scrollable"}>
                        <Owned {...owned} />
                    </ul>
                </div>

                    : ""}
            </div>
        </div>
    );
}
export default History;