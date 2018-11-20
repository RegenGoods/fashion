import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Layout from './common/SidebarLayout'
import TopBar from './common/TopBar'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'
import FarmDetail from './farms/FarmDetail'

class Farm extends Component {
  render () {
    return (
      <div>
        <TopBar address={this.props.address} />
        <FarmDetail address={this.props.address} />
      </div>
    )
  }
}

Farm.contextTypes = {
  drizzle: PropTypes.object
}

// May still need this even with data function to refresh component on updates for this contract.
const mapState = state => {
  return {
    address: state.accounts[0],
    Regen: state.contracts.Regen
  }
}

export default drizzleConnect(Farm, mapState);
