import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';

class Assign extends Component {
  constructor (props, context) {
    super(props)
    this.methods = context.drizzle.contracts.Regen.methods
  }

  submit = () => this.methods.assignBounty.cacheSend(this.props.bountyId, this.props.farmId, this.props.farmIdx)

  render () {
    return (

      <Button onClick={this.submit} color="primary">
        Assign
      </Button>

    )
  }
}

Assign.contextTypes = {
  drizzle: PropTypes.object
}

// May still need this even with data function to refresh component on updates for this contract.
const mapState = state => {
  return {
    Regen: state.contracts.Regen
  }
}

export default drizzleConnect(Assign, mapState);
