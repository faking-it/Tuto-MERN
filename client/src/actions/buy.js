import axios from "axios";
import {
    setAlert
} from "./alert";
import {
    BUY_SUCCESS,
    BUY_FAIL
} from "./types";
import setAuthToken from "../utilities/setAuthToken";

// Buy a tree
export const buyTree = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get("api/");

        dispatch({
            type: BUY_SUCCESS,
            payload: res.data
        });
        await axios.post(
            "/api/side/gamelog",
            JSON.stringify({ name, action: "has bought a tree!" }),
            config
        );
    } catch (err) {
        dispatch({
            type: BUY_FAIL
        });
    }
};