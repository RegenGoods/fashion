import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'

import { getMultihash } from '../../util/multihash'

import IpfsContent from '../common/IpfsContent'

class MeasurementItem extends Component {
  constructor (props, context) {
    super(props)
    this.methods = context.drizzle.contracts.Regen.methods
    this.getMeasurementKey = this.methods.getMeasurement.cacheCall(props.id)
  }

  getRenderValues = () => {
    return {
      measurement: this.props.Regen.getMeasurement[this.getMeasurementKey] ?
        Object.values(this.props.Regen.getMeasurement[this.getMeasurementKey].value) : 'loading bounty'
    }
  }

  render () {
    const { account, id } = this.props
    let { measurement } = this.getRenderValues();
    let plotId;

    if (Array.isArray(measurement)) {
      plotId = measurement[1]
      measurement = <IpfsContent hash={getMultihash(measurement.slice(2))} />
    }

    return (
      <div>
        {measurement}
        <div>
          plot: {plotId}
        </div>
      </div>
    )
  }
}

MeasurementItem.contextTypes = {
  drizzle: PropTypes.object
}

// May still need this even with data function to refresh component on updates for this contract.
const mapState = state => {
  return {
    Regen: state.contracts.Regen
  }
}

export default drizzleConnect(MeasurementItem, mapState);
