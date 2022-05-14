import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useState } from "react";
import atob from "atob";

import getDataApi from "../service/getDataApi";
import "../../style/UserRepo.scss";

const RepoItem = ({ repo }) => {
  const [popupReadMe, setPopupReadMe] = useState(false);
  const [readMeContent, setReadMeContent] = useState("");

  const handleHidePopUp = () => {
    setPopupReadMe(false);
  };
  const handlePopUp = async () => {
    setPopupReadMe(true);
    await getDataApi(
      `https://api.github.com/repos/${login}/${repo.name}/contents/README.md`
    )
      .then((response) => setReadMeContent(atob(response.data.content)))
      .catch((err) =>
        setReadMeContent("There is no README.md file in this repository")
      );
  };

  const { login } = useParams();
  return (
    <>
      <div className="repoCard" onClick={handlePopUp}>
        <h3>
          <a href={repo.html_url}>{repo.name}</a>
        </h3>
        <ul>
          <li>Forks:{repo.forks}</li>
          <li>Open Issues:{repo.open_issues}</li>
          <li>Watchers:{repo.watchers}</li>
        </ul>
      </div>

      {popupReadMe && (
        <>
          <div className="overlay" onClick={handleHidePopUp} />
          <div
            className="repoCardPopUp"
            id="repoCardPopUp"
            onClick={handleHidePopUp}
          >
            {readMeContent}
          </div>
        </>
      )}
    </>
  );
};
RepoItem.propTypes = {
  repo: PropTypes.object.isRequired,
};
export default RepoItem;
