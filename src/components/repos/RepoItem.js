import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import atob from "atob";

import githubContext from "../../context/Github/githubContext";
import getDataApi from "../service/getDataApi";
import "../../style/UserRepo.scss";

const RepoItem = ({ repo }) => {
  const [popupReadMe, setPopupReadMe] = useState(false);
  const [readMeContent, setReadMeContent] = useState("");

  const handlePopUp = async () => {
    setPopupReadMe(true);
    const result = await getDataApi(
      `https://api.github.com/repos/${login}/${repo.name}/contents/README.md`
    ).then((response) => setReadMeContent(atob(response.data.content)));
    console.log(readMeContent);
  };
  const handleHidePopUp = () => {
    setPopupReadMe(false);
    console.log("Handle Hide Pop Up");
  };
  const { login } = useParams();
  return (
    // <div className="repoCardContainer">
    <div className="repoCard" onClick={handlePopUp}>
      <h3>
        <a href={repo.html_url}>{repo.name}</a>
      </h3>
      <ul>
        <li>Forks:{repo.forks}</li>
        <li>Open Issues:{repo.open_issues}</li>
        <li>Watchers:{repo.watchers}</li>
      </ul>
      {popupReadMe && (
        <div className="repoCardPopUp" onClick={handleHidePopUp}>
          {readMeContent}
        </div>
      )}
    </div>
    //   //{" "}
    // </div>
  );
};

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired,
};

export default RepoItem;
