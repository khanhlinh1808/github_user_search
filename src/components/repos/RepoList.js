import PropTypes from "prop-types";

import RepoItem from "./RepoItem";

const RepoList = ({ repos }) => {
  return repos.map((repo) => <RepoItem repo={repo} key={repo.id} />);
};

RepoList.propTypes = {
  repos: PropTypes.array,
};

export default RepoList;
