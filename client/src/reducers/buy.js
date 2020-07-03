import { BUY_SUCCESS, BUY_FAIL } from "../actions/types";

const initialState = {
  user: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case BUY_SUCCESS:
      return {
        ...state,
        user: payload
      };
    case BUY_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
}
