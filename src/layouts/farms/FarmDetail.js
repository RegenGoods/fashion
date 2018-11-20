import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { getMultihash } from '../../util/multihash'
import {formatGroupInfo, formatGroupData, combineGroupDataAndInfo} from '../../util/formatResponse'

import IpfsContent from '../common/IpfsContent'
import SwipeableTabs from '../common/SwipeableTabs'
import CreatePlot from '../ui/CreatePlot'
import CreateSeason from '../ui/CreateSeason'
import PlotCards from '../plots/PlotCards'
import PlotDetail from '../plots/PlotDetail'
import SeasonCards from '../seasons/SeasonCards'
import SeasonDetail from '../seasons/SeasonDetail'
import BountyCards from '../bounties/BountyCards'
import BountyDetail from '../bounties/BountyDetail'


class Detail extends Component {
  constructor (props, context) {
    super(props)
    this.farmId = props.match.params.farmId
    this.methods = context.drizzle.contracts.Regen.methods
    this.getFarmKey = this.methods.getFarm.cacheCall(this.farmId)
    this.seasonIdsKey = this.methods.getFarmSeasonIds.cacheCall(this.farmId)
    this.plotIdsKey = this.methods.getFarmPlotIds.cacheCall(this.farmId)
    this.bountyIdsKey = this.methods.getBountyIdsForFarm.cacheCall(this.farmId)

    this.state = {
      index: 0,
      plotId: null,
      seasonId: null,
      bountyId: null
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.match.url !== this.props.match.url) {

    }
  }

  getRenderValues = () => {
    return {
      farm: this.props.Regen.getFarm[this.getFarmKey] ?
        Object.values(this.props.Regen.getFarm[this.getFarmKey].value) : 'loading farm',
      seasonIds: this.props.Regen.getFarmSeasonIds[this.seasonIdsKey] ?
        this.props.Regen.getFarmSeasonIds[this.seasonIdsKey].value : 'loading seasons',
      plotIds: this.props.Regen.getFarmPlotIds[this.plotIdsKey] ?
        this.props.Regen.getFarmPlotIds[this.plotIdsKey].value : 'loading plots',
      bountyIds: this.props.Regen.getBountyIdsForFarm[this.bountyIdsKey] ?
        this.props.Regen.getBountyIdsForFarm[this.bountyIdsKey].value : 'loading bounties'
    }
  }

  updateView = (viewType, index, id) => this.setState({...this.state, index, [viewType]: id})

  updateIndex = (ev, index) => this.setState({...this.state, index})

  render () {
    const { address, id } = this.props
    let { farm, seasonIds, plotIds, bountyIds } = this.getRenderValues();

    let adminButtons = null

    if (Array.isArray(farm)) {

      if (farm[0] == address) {
        adminButtons = <div>
          <CreatePlot farmId={this.farmId} />
          {Array.isArray(plotIds) ?  <CreateSeason farmId={this.farmId} plotOptions={plotIds.map(id => ({value:id, label:id}))} /> : null}
        </div>
      }
      farm = <IpfsContent hash={getMultihash(farm.slice(1))} />
    }

    const tabs = [
      {
        label: 'Plots',
        content: Array.isArray(plotIds) ?
          <PlotCards farmId={this.farmId} plotIds={plotIds} onClick={this.updateView.bind(this, 'plotId', 3)} />
          :
          plotIds
      },
      {
        label: 'Seasons',
        content: Array.isArray(seasonIds) ?
          <SeasonCards farmId={this.farmId} seasonIds={seasonIds} onClick={this.updateView.bind(this, 'seasonId', 4)} />
          :
          seasonIds
      },
      {
        label: 'Bounties',
        content: Array.isArray(bountyIds) ?
          <BountyCards farmId={this.farmId} bountyIds={bountyIds} onClick={this.updateView.bind(this, 'bountyId', 5)} />
          :
          bountyIds
      },
      {
        label: null,
        content: this.state.plotId ? <PlotDetail id={this.state.plotId} farmId={this.farmId} /> : <div />
      },
      {
        label: null,
        content: this.state.seasonId ? <SeasonDetail id={this.state.seasonId} /> : <div />
      },
      {
        label: null,
        content: this.state.bountyId ? <BountyDetail  id={this.state.bountyId} /> : <div />
      }
    ]


    return (
      <div>
        {farm}
        {adminButtons}
        <SwipeableTabs tabs={tabs} index={this.state.index} updateIndex={this.updateIndex}/>
      </div>
    )
  }
}

Detail.contextTypes = {
  drizzle: PropTypes.object
}

const mapState = state => {
  return {
    address: state.accounts[0],
    Regen: state.contracts.Regen
  }
}

export default withRouter(drizzleConnect(Detail, mapState));
