import { FETCH_IP_LIST, UPDATE_IP_DATA } from "../actions/actionTypes";

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
      case UPDATE_IP_DATA:
        //
    default:
      return { ...state };
  }
};
