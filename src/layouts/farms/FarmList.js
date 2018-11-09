import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'

import FarmItem from './FarmItem'

class FarmList extends Component {
  constructor (props, context) {
    super(props)
    this.methods = context.drizzle.contracts.Regen.methods
    this.ownerFarmIdsKey = this.methods.getOwnerFarmIds.cacheCall(props.address)
  }

  getRenderValues = () => {
    return {
      ownerFarmIds: this.props.Regen.getOwnerFarmIds[this.ownerFarmIdsKey] ?
        this.props.Regen.getOwnerFarmIds[this.ownerFarmIdsKey].value : 'loading farm info'
    }
  }

  render () {
    const { account } = this.props
    const { ownerFarmIds } = this.getRenderValues();
    let farms = 'Loading Farms'

    if (Array.isArray(ownerFarmIds)) {
      if (ownerFarmIds.length) {
        farms = ownerFarmIds.map(id => <FarmItem id={id} />)
      } else {
        farms = 'No farms for user'
      }
    }

    return (
      <div>
        {farms}
      </div>
    )
  }
}

FarmList.contextTypes = {
  drizzle: PropTypes.object
}

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    address: state.accounts[0],
    Regen: state.contracts.Regen
  }
}

export default drizzleConnect(FarmList, mapStateToProps);
