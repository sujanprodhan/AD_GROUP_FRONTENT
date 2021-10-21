import { FETCH_IP_LIST } from "../actions/actionTypes";

const openState = {
  ipList: [],
};

export default (state = openState, action) => {
  switch (action.type) {
    case FETCH_IP_LIST:
      return {
        ...state,
        ipList: action.payload,
      };
    default:
      return { ...state };
  }
};
