import axios from "axios";
import { setAlert } from "./alert";
import { BUY_SUCCESS, BUY_FAIL } from "./types";
import setAuthToken from "../utilities/setAuthToken";

// Buy a tree
export const buyTree = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    await axios.post(
      "/api/side/gamelog",
      JSON.stringify({ action: "has bought a tree!" }),
      config
    );

    dispatch({
      type: BUY_SUCCESS
      //payload: res.data
    });
  } catch (err) {
    dispatch({
      type: BUY_FAIL
    });
  }
};
