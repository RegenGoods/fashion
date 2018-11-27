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

class Item extends Component {
  constructor (props, context) {
    super(props)
    this.methods = context.drizzle.contracts.Regen.methods
    this.getFarmKey = this.methods.getFarm.cacheCall(props.id)
    this.seasonIdsKey = this.methods.getFarmSeasonIds.cacheCall(props.id)
    this.plotIdsKey = this.methods.getFarmPlotIds.cacheCall(props.id)
  }

  getRenderValues = () => {
    return {
      farm: this.props.Regen.getFarm[this.getFarmKey] ?
        Object.values(this.props.Regen.getFarm[this.getFarmKey].value) : 'loading farm',
      seasonIds: this.props.Regen.getFarmSeasonIds[this.seasonIdsKey] ?
        this.props.Regen.getFarmSeasonIds[this.seasonIdsKey].value : 'loading seasons',
      plotIds: this.props.Regen.getFarmPlotIds[this.plotIdsKey] ?
        this.props.Regen.getFarmPlotIds[this.plotIdsKey].value : 'loading plots'
    }
  }

  render () {
    const { account, id } = this.props
    let { farm, seasonIds, plotIds } = this.getRenderValues();

    if (Array.isArray(farm)) {
      farm = <IpfsContent hash={getMultihash(farm.slice(1))} />
    }

    return (
      <div>
        <Link to={`/farm/${id}`}>
          {farm}
        </Link>
        <div>
          <h4>Seasons</h4>
          {Array.isArray(plotIds) ?  <CreateSeason farmId={id} plotOptions={plotIds.map(id => ({value:id, label:id}))} /> : null}
          {Array.isArray(seasonIds) ? seasonIds.length ? seasonIds.map(id => <SeasonItem key={id} id={id} />) : 'No seasons for this farm': seasonIds}
        </div>
        <div>
          <h4>Plots</h4>
          <CreatePlot farmId={id} />
          {Array.isArray(plotIds) ? plotIds.length ? plotIds.map(id => <PlotItem key={id} id={id} />) : 'No plots for this farm': plotIds}
        </div>
      </div>
    )
  }
}

Item.contextTypes = {
  drizzle: PropTypes.object
}

const mapStateToProps = state => {
  return {
    address: state.accounts[0],
    Regen: state.contracts.Regen
  }
}

export default drizzleConnect(Item, mapStateToProps);
