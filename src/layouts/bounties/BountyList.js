import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'

import BountyItem from './BountyItem'

class BountyList extends Component {
  constructor (props, context) {
    super(props)
    this.methods = context.drizzle.contracts.Regen.methods
    this.bountyIdsKey = this.methods.getBountyIdsForOwner.cacheCall(props.address)
  }

  getRenderValues = () => {
    return {
      bountyIds: this.props.Regen.getBountyIdsForOwner[this.bountyIdsKey] ?
        this.props.Regen.getBountyIdsForOwner[this.bountyIdsKey].value : 'loading bounties'
    }
  }

  render () {
    const { account } = this.props
    const { bountyIds } = this.getRenderValues();
    let bounties = 'Loading Bounties'

    if (Array.isArray(bountyIds)) {
      if (bountyIds.length) {
        bounties = bountyIds.map(id => <BountyItem key={id} id={id} />)
      } else {
        bounties = 'No bounties for user'
      }
    }

    return (
      <div>
        {bounties}
      </div>
    )
  }
}

BountyList.contextTypes = {
  drizzle: PropTypes.object
}

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    address: state.accounts[0],
    Regen: state.contracts.Regen
  }
}

export default drizzleConnect(BountyList, mapStateToProps);
