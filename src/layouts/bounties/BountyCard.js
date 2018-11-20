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
    this.plotKey = this.methods.getPlot.cacheCall(props.id)
  }

  getRenderValues = () => {
    return {
      plot: this.props.Regen.getPlot[this.plotKey] ?
        Object.values(this.props.Regen.getPlot[this.plotKey].value) : 'loading plot',
    }
  }

  render () {
    const { account, id } = this.props
    let { plot } = this.getRenderValues();

    if (Array.isArray(plot)) {
      plot = <IpfsContent hash={getMultihash(plot.slice(1))} />
    }



    return (
      <div>
        {plot}
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
