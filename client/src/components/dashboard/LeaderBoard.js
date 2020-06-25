import React, { useState, useEffect } from "react";
import axios from 'axios';
import Lead from "./lead";

const LeaderBoard = () => {

    // axios
    //     .get("/api/trees/get")
    //     .then((response) => {
    //         response.data.forEach((element) => {
    //             please.push({ position: element });

    //             //console.log(element);
    //         });
    //         setMarkers(please);
    //         console.log(please.length);
    //     })



    const [loaded, setLoaded] = useState(false);

    const [leaderboard, setleaderboard] = useState([]);
    useEffect(() => {
        //if (!loaded) {
            let please = [];
            axios
                .get("/api/side/lead")
                .then((response) => {
                    const data = response.data;
                    data.forEach(element => {
                        console.log(element);
                        const name = element.name;
                        please.push(name);
                        // console.log(please.length);
                    });
                    // if (please.length > 9) {

                    setleaderboard(please);
                    console.log(leaderboard);

                    // }
                });

            setLoaded(true);

        //}
    }, []);

    // const try= (please) => {

    //     if (!please.length) return null;


    //     return please.map((post, index) => (
    //         <li>
    //             <p>{post}</p>
    //         </li>
    //     ));
    // };


    return (

        <div className={"leaderBoard-container side-child"} >
            <h3>{"Leaderboard"}</h3>
            <div className={"log-container"}>
                <ol>
                    <Lead {...leaderboard} />
                </ol>
            </div>
        </div >
    )

}
export default LeaderBoard;