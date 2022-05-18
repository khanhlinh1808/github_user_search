import { useContext } from 'react'
import styled from 'styled-components'

import UserItem from './UserItem'
import githubContext from '../../context/Github/githubContext'

const StyledUserListContainer = styled.div`
  display: flex;
  justify-content: center;
  .userList {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 80%;
  }
`
const UserList = () => {
  const useGithubContext = useContext(githubContext)
  const { userList } = useGithubContext.state

  return (
    <StyledUserListContainer className="userListContainer">
      <div className="userList">
        {userList.length !== 0 &&
          userList.map((user, index) => <UserItem key={index} user={user} />)}
      </div>
    </StyledUserListContainer>
  )
}

export default UserList
