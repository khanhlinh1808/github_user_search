import { SEARCH_USER, GET_USER, GET_REPOS } from "../actionTypes";

const githubReducer = (state, action) => {
  switch (action.type) {
    case SEARCH_USER:
      return {
        ...state,
        userList: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
      };
    default:
      return state;
  }
};

export default githubReducer;
