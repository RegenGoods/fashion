import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'

import MeasurementItem from './MeasurementItem'

class MeasurementList extends Component {
  constructor (props, context) {
    super(props)
    this.methods = context.drizzle.contracts.Regen.methods
    this.idsKey = this.methods.getMeasurementIdsForAddress.cacheCall(props.address)
  }

  getRenderValues = () => {
    return {
      ids: this.props.Regen.getMeasurementIdsForAddress[this.idsKey] ?
        this.props.Regen.getMeasurementIdsForAddress[this.idsKey].value : 'loading bounties'
    }
  }

  render () {
    const { account } = this.props
    const { ids } = this.getRenderValues();
    let measurements = 'loading measurements'
    if (Array.isArray(ids)) {
      if (ids.length) {
        measurements = ids.map(id => <MeasurementItem key={id} id={id} />)
      } else {
        measurements = 'No measurements for user'
      }
    }

    return (
      <div>
        {measurements}
      </div>
    )
  }
}

MeasurementList.contextTypes = {
  drizzle: PropTypes.object
}

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    address: state.accounts[0],
    Regen: state.contracts.Regen
  }
}

export default drizzleConnect(MeasurementList, mapStateToProps);
