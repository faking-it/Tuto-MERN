import React from "react";
const Free = (free) => {

    //const [loaded, setLoaded] = useState(false);

    const free2 = Object.values(free);
    //console.log(leaderboard2);
    // useEffect(() => {

    // for (const [key, value] of Object.entries(leaderboard)) {
    //     console.log(`${key}: ${value}`);
    //     return (<li key={`${key}`}>
    //         <p> {`${value}`}</p>
    //     </li>)
    // }
    //setLoaded(true);

    // }, [leaderboard2])
    //if (!leaderboard.length) return null;


    return free2.map((element, index) => (
        <li key={index}>
            <p>{element.arbotag}</p>
        </li>
    ));

}
export default Free;