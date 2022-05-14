import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";

import { useContext } from "react";

import "../../style/UserItem.scss";
import githubContext from "../../context/Github/githubContext";

const UserItem = ({ user: { login, avatar_url, html_url } }) => {
  const gc = useContext(githubContext);
  const { loading } = gc;
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className="card text-center">
        <img
          src={avatar_url}
          alt="userAvatar"
          className="round-img"
          style={{ width: "60px" }}
        />
        <h3>{login}</h3>
        <div className="more-link">
          <Link to={`user/${login}`} style={{ color: "black" }}>
            <button>More...</button>
          </Link>
        </div>
      </div>
    );
  }
};
UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
