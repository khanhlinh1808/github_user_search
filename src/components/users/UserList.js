import { useContext } from "react";
import UserItem from "./UserItem";
import githubContext from "../../context/Github/githubContext";

import "../../style/UserList.scss";
const UserList = () => {
  const gc = useContext(githubContext);
  const { userList } = gc.state;

  return (
    <div className="userListContainer">
      <div className="userList">
        {userList.length !== 0 &&
          userList.map((user, index) => <UserItem key={index} user={user} />)}
      </div>
    </div>
  );
};

export default UserList;
