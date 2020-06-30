import React from "react";
const Lead = (leaderboard) => {
  //const [loaded, setLoaded] = useState(false);

  const leaderboard2 = Object.values(leaderboard);
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

  return leaderboard2.map((name, index) => (
    <li key={index}>
      <p>{name}</p>
    </li>
  ));
};
export default Lead;
