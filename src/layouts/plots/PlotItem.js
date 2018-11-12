import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'

import { getMultihash } from '../../util/multihash'
import {formatGroupInfo, formatGroupData, combineGroupDataAndInfo} from '../../util/formatResponse'

import IpfsContent from '../common/IpfsContent'
import CreatePlot from '../ui/CreatePlot'

class PlotItem extends Component {
  constructor (props, context) {
    super(props)
    this.methods = context.drizzle.contracts.Regen.methods
    this.getPlotKey = this.methods.getPlot.cacheCall(props.id)
  }

  getRenderValues = () => {
    return {
      plot: this.props.Regen.getPlot[this.getPlotKey] ?
        Object.values(this.props.Regen.getPlot[this.getPlotKey].value) : 'loading plot'
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

PlotItem.contextTypes = {
  drizzle: PropTypes.object
}

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    Regen: state.contracts.Regen
  }
}

export default drizzleConnect(PlotItem, mapStateToProps);
