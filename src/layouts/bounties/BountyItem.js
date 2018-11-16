import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'

import { getMultihash } from '../../util/multihash'
import {formatGroupInfo, formatGroupData, combineGroupDataAndInfo} from '../../util/formatResponse'

import IpfsContent from '../common/IpfsContent'

class BountyItem extends Component {
  constructor (props, context) {
    super(props)
    this.methods = context.drizzle.contracts.Regen.methods
    this.getBountyKey = this.methods.getBounty.cacheCall(props.id)
  }

  getRenderValues = () => {
    return {
      bounty: this.props.Regen.getBounty[this.getBountyKey] ?
        Object.values(this.props.Regen.getBounty[this.getBountyKey].value) : 'loading bounty'
    }
  }

  render () {
    const { account, id } = this.props
    let { bounty } = this.getRenderValues();
    let created, claimed, bountyContent = 'loading';

    if (Array.isArray(bounty)) {
      created = bounty[2]
      claimed = bounty[4]
      bountyContent = <IpfsContent hash={getMultihash(bounty.slice(7))} />
    }

    return (
      <div>
        {bountyContent}
        <div>
          Created By: {bounty[2]}
        </div>
        <div>
          {claimed ? 'Claimed' : 'Unclaimed'}
        </div>
      </div>
    )
  }
}

BountyItem.contextTypes = {
  drizzle: PropTypes.object
}

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    Regen: state.contracts.Regen
  }
}

export default drizzleConnect(BountyItem, mapStateToProps);
