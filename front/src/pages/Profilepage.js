import React from 'react'
import { PageTemplate } from 'components/common'
import ProfileContainer from 'containers/profile/ProfileContainer'

const Profilepage = ({ match }) => {
  const { username } = match.params

  return (
    <PageTemplate>
      <ProfileContainer username={username} />
    </PageTemplate>
  )
}

export default Profilepage