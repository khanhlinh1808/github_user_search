import { useReducer, useContext } from "react";
import axios from "axios";

import githubContext from "./githubContext";

import {
  SEARCH_USER,
  GET_USER,
  GET_REPOS,
  SET_LOADING,
  SET_ALERT,
  REMOVE_ALERT,
} from "../actionTypes";

const GithubState = (props) => {
  const gc = useContext(githubContext);
  console.log(gc.state);
  const { state, dispatch } = gc;
  // Search User
  const searchUser = async (text, page) => {
    // const respon = userList;

    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&page=${page}`
    );
    if (page === 1) {
      gc.dispatch({
        type: SEARCH_USER,
        payload: res.data.items,
      });
    } else {
      gc.dispatch({
        type: SEARCH_USER,
        payload: [...res.data.items],
      });
    }
  };
  // Get User
  const getUser = async (userName) => {
    setLoading();
    const res = await axios.get(`https://api.github.com/users/${userName}`);
    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };
  // Get Repos
  const getRepo = async (userName) => {
    const res = await axios.get(
      `https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc`
    );
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  };
  // Set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return <></>;
};

export default GithubState;
