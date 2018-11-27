import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { getMultihash } from '../../util/multihash'
import {formatGroupInfo, formatGroupData, combineGroupDataAndInfo} from '../../util/formatResponse'

import IpfsContent from '../common/IpfsContent'
import CreatePlot from '../ui/CreatePlot'
import CreateSeason from '../ui/CreateSeason'
import PlotItem from '../plots/PlotItem'
import SeasonItem from '../seasons/SeasonItem'


class BountyCard extends Component {
  constructor (props, context) {
    super(props)

    this.methods = context.drizzle.contracts.Regen.methods
    this.bountyKey = this.methods.getBounty.cacheCall(props.id)
  }

  getRenderValues = () => {
    return {
      bountyResponse: this.props.Regen.getBounty[this.bountyKey] ?
        Object.values(this.props.Regen.getBounty[this.bountyKey].value) : 'loading bounty',
    }
  }

  render () {
    const { account, id } = this.props
    let { bountyResponse } = this.getRenderValues();
    let created, claimed, bounty = 'loading';

    if (Array.isArray(bountyResponse)) {
      created = bountyResponse[2]
      claimed = bountyResponse[4]
      bounty = <IpfsContent hash={getMultihash(bountyResponse.slice(7))} />
    }



    return (
      <div>
        {bounty}
      </div>
    )
  }
}

BountyCard.contextTypes = {
  drizzle: PropTypes.object
}

const mapState = state => {
  return {
    address: state.accounts[0],
    Regen: state.contracts.Regen
  }
}

export default drizzleConnect(BountyCard, mapState);
