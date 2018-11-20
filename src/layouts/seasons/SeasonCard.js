import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getMultihash } from '../../util/multihash'
import {formatGroupInfo, formatGroupData, combineGroupDataAndInfo} from '../../util/formatResponse'

import IpfsContent from '../common/IpfsContent'
import CreatePlot from '../ui/CreatePlot'
import CreateSeason from '../ui/CreateSeason'
import PlotItem from '../plots/PlotItem'
import SeasonItem from '../seasons/SeasonItem'


class PlotCard extends Component {
  constructor (props, context) {
    super(props)

    this.methods = context.drizzle.contracts.Regen.methods
    this.seasonKey = this.methods.getSeason.cacheCall(props.id)
  }

  getRenderValues = () => {
    return {
      season: this.props.Regen.getSeason[this.seasonKey] ?
        Object.values(this.props.Regen.getSeason[this.seasonKey].value) : 'loading plot',
    }
  }

  render () {
    const { account, id } = this.props
    let { season } = this.getRenderValues();

    if (Array.isArray(season)) {
      season = <IpfsContent hash={getMultihash(season.slice(3))} />
    }



    return (
      <div>
        {season}
      </div>
    )
  }
}

PlotCard.contextTypes = {
  drizzle: PropTypes.object
}

const mapState = state => {
  return {
    address: state.accounts[0],
    Regen: state.contracts.Regen
  }
}

export default drizzleConnect(PlotCard, mapState);
