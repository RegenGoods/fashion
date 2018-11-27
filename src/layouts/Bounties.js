import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'
import BountyItem from './bounties/BountyItem'
import TopBar from './common/TopBar'
import CreateBounty from './ui/CreateBounty'


class Bounties extends Component {
  constructor (props, context) {
    super(props)

    this.methods = context.drizzle.contracts.Regen.methods
    this.bountiesCountKey = this.methods.getBountyCount.cacheCall()
    this.ownerFarmIdsKey = this.methods.getOwnerFarmIds.cacheCall(props.address)

  }

  getRenderValues = () => {
    return {
      bountyCount: this.props.Regen.getBountyCount[this.bountiesCountKey] ?
        parseInt(this.props.Regen.getBountyCount[this.bountiesCountKey].value, 10) : 'loading',
      ownerFarmIds: this.props.Regen.getOwnerFarmIds[this.ownerFarmIdsKey] ?
        this.props.Regen.getOwnerFarmIds[this.ownerFarmIdsKey].value : 'loading'
    }
  }

  render () {
    let { bountyCount, ownerFarmIds } = this.getRenderValues();
    let ids = [];
    let farmId = null;

    if (Number.isInteger(bountyCount)) {
      ids = [...Array(bountyCount).keys()]
    }

    if (Array.isArray(ownerFarmIds) && ownerFarmIds.length) {
      farmId = ownerFarmIds[0]; //are multiple farms per owner possible?
    }

    return (
      <div>
        <TopBar address={this.props.address} />
        <h2>Bounties</h2>
        <CreateBounty />
        {ids.map(id=><BountyItem id={id} farmId={farmId} />)}

      </div>
    )
  }
}


Bounties.contextTypes = {
  drizzle: PropTypes.object
}

const mapState = state => {
  return {
    address: state.accounts[0],
    Regen: state.contracts.Regen
  }
}

export default drizzleConnect(Bounties, mapState);
