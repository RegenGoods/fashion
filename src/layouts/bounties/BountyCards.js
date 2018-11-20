import React from 'react'
import BountyCard from './BountyCard'

export default ({bountyIds}) =>
  <div>
    {bountyIds.length ?
      bountyIds.map(id => <BountyCard key={id} id={id} />)
      :
      'No bounties for this farm'
    }
  </div>
