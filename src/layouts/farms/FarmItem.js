import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'

import { getMultihash } from '../../util/multihash'
import {formatGroupInfo, formatGroupData, combineGroupDataAndInfo} from '../../util/formatResponse'

import IpfsContent from '../common/IpfsContent'

class Item extends Component {
  constructor (props, context) {
    super(props)
    this.methods = context.drizzle.contracts.Regen.methods
    this.getFarmKey = this.methods.getFarm.cacheCall(props.id)
  }

  getRenderValues = () => {
    return {
      farm: this.props.Regen.getFarm[this.getFarmKey] ?
        Object.values(this.props.Regen.getFarm[this.getFarmKey].value) : 'loading farm'
    }
  }

  render () {
    const { account } = this.props
    let { farm } = this.getRenderValues();

    if (Array.isArray(farm)) {
      farm = <IpfsContent hash={getMultihash(farm.slice(1))} />
    }

    return (
      <div>
        {farm}
      </div>
    )
  }
}

Item.contextTypes = {
  drizzle: PropTypes.object
}

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    address: state.accounts[0],
    Regen: state.contracts.Regen
  }
}

export default drizzleConnect(Item, mapStateToProps);
