import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import TopBar from './common/TopBar'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'

class Home extends Component {
  render () {
    return (
      <div>
        <TopBar address={this.props.account} />
        <Grid container spaceing={16}>
          <Grid item xs={4}>

          </Grid>
          <Grid item xs={4}>

          </Grid>
        </Grid>

      </div>
    )
  }
}

Home.contextTypes = {
  drizzle: PropTypes.object
}

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    account: state.accounts[0],
    Regen: state.contracts.Regent
  }
}

export default drizzleConnect(Home, mapStateToProps);
