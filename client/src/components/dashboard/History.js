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

    console.log(free);
    console.log(owned);
    return (
        <div className={"sidecontent-container side-child"}>
            <h3>{"History"}</h3>
            <div className={"history-container"}>
                <div className={"free-container"}>
                    <h6>{"Free trees"}</h6>
                    <ul>
                        <Free {...free} />
                    </ul>

                </div>
                <div className={"free-container"}>
                    <h6>{"owned trees"}</h6>
                    <hr />
                    <ul>
                        <Owned {...owned} />
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default History;