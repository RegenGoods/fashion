import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'

import { getMultihash } from '../../util/multihash'
import {formatGroupInfo, formatGroupData, combineGroupDataAndInfo} from '../../util/formatResponse'

import IpfsContent from '../common/IpfsContent'


class SeasonItem extends Component {
  constructor (props, context) {
    super(props)
    this.methods = context.drizzle.contracts.Regen.methods
    this.getSeasonKey = this.methods.getSeason.cacheCall(props.id)
    this.getPlotsKey = this.methods.getSeasonPlotIds.cacheCall(props.id)
  }

  getRenderValues = () => {
    return {
      season: this.props.Regen.getSeason[this.getSeasonKey] ?
        Object.values(this.props.Regen.getSeason[this.getSeasonKey].value) : 'loading season',
      plotIds: this.props.Regen.getSeasonPlotIds[this.getPlotsKey] ?
        this.props.Regen.getSeasonPlotIds[this.getPlotsKey].value : 'loading plot ids'
    }
  }

  render () {
    const { account, id } = this.props
    let { season, plotIds } = this.getRenderValues();

    if (Array.isArray(season)) {
      season = <IpfsContent hash={getMultihash(season.slice(3))} />
    }

    return (
      <div>
        {season}
        <div>Plots - {Array.isArray(plotIds) ? plotIds.join(',') : plotIds}</div>
      </div>
    )
  }
}

SeasonItem.contextTypes = {
  drizzle: PropTypes.object
}

const mapStateToProps = state => {
  return {
    address: state.accounts[0],
    Regen: state.contracts.Regen
  }
}

export default drizzleConnect(SeasonItem, mapStateToProps);
