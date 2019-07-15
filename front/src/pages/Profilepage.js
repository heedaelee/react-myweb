import React from 'react'
import { PageTemplate } from 'components/common'
import ProfileContainer from 'containers/profile/ProfileContainer'
import UnregisterModalContainer from 'containers/modal/unregisterModalContainer'

const Profilepage = () => {

  return (
    <PageTemplate>
      <ProfileContainer />
      <UnregisterModalContainer />
    </PageTemplate>
  )
}

export default Profilepage