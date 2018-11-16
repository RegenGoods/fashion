import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import TopBar from './common/TopBar'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'
import CreateFarm from './ui/CreateFarm'
import FarmList from './farms/FarmList'
import CreateBounty from './ui/CreateBounty'
import BountyList from './bounties/BountyList'
import MeasurementList from './measurements/MeasurementList'

class User extends Component {
  render () {
    return (
      <div>
        <TopBar address={this.props.address} />
        <Grid container spaceing={16}>

          <Grid item xs={4}>
            <CreateFarm />
            <FarmList address={this.props.address}/>
          </Grid>

          <Grid item xs={4}>
            <MeasurementList address={this.props.address} />

          </Grid>

          <Grid item xs={4}>
            <CreateBounty />
            <BountyList address={this.props.address} />

          </Grid>

        </Grid>

      </div>
    )
  }
}

User.contextTypes = {
  drizzle: PropTypes.object
}

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    address: state.accounts[0],
    Regen: state.contracts.Regent
  }
}

export default drizzleConnect(User, mapStateToProps);
