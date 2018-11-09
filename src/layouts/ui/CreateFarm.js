import React, { Component, Fragment } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import { getBytes32FromMultihash } from '../../util/multihash'
import {formatGroupInfo, formatGroupData, combineGroupDataAndInfo} from '../../util/formatResponse'
import farmSchema from '../../schemas/farm'

import Text from '../common/forms/Text'
import DialogForm from '../common/DialogForm'
import Dialog from '../common/Dialog'

class Create extends Component {
  constructor (props, context) {
    super(props)
    this.methods = context.drizzle.contracts.Regen.methods
    console.log('farm schema: ', farmSchema)

    this.state = {
      open: false,
      openInfo: false,
      contractFields: farmSchema.contract.reduce((acc, f) => {
        acc[f.label] = f.default;
        return acc;
      }, {}),
      offChainFields: farmSchema.offChain.reduce((acc, f) => {
        acc[f.label] = f.default;
        return acc;
      }, {}),
    }
  }

  updateShowingForm = open => this.setState({...this.state, open})
  updateShowingInfo = openInfo => this.setState({...this.state, openInfo})

  updateContractField = (field, e) => this.setState({...this.state, contractFields: {...this.state.contractFields, [field]: e.target.value}})

  updateOffChainField = (field, e) => this.setState({...this.state, offChainFields: {...this.state.offChainFields, [field]: e.target.value}})

  submit = () => {
    this.props.submitFarm(JSON.stringify(this.state.offChainFields), this.methods.addFarm.cacheSend)
    this.setState({...this.state, open: false, openInfo: true})
  }

  render () {

    const contractFields = [...farmSchema.contract].map(f => {
      f.value = this.state.contractFields[f.name]
      f.onChange = this.updateContractField.bind(this, f.label)
      f.key = f.label
      return f;
    })

    const offChainFields = [...farmSchema.offChain].map(f => {
      f.value = this.state.offChainFields[f.label]
      f.onChange = this.updateOffChainField.bind(this, f.label)
      f.key = f.label
      return f;
    })

    const fields = contractFields.concat(offChainFields).map(Text)



    return (
      <div>
        <h3>Owned Groups</h3>
        <Button onClick={this.updateShowingForm.bind(this, true)} color="primary">
          Create Farm
        </Button>

        <DialogForm
          open={this.state.open}
          text='Fill in the fields below to create your farm'
          handleClose={this.updateShowingForm.bind(this, false)}
          submitLabel='Create Group'
          onSubmit={this.submit}
          content={fields} />
          <Dialog
            open={this.state.openInfo}
            handleClose={this.updateShowingInfo.bind(this, false)}
            submitLabel='Create Group'
            onSubmit={this.submit}
            content='Preparin Your Farm' />
      </div>
    )
  }
}

Create.contextTypes = {
  drizzle: PropTypes.object
}

// May still need this even with data function to refresh component on updates for this contract.
const mapState = state => {
  return {
    Regen: state.contracts.Regen,
    pendingUpload: state.data.pendingUpload,
    requestedHash: state.data.requestedHash
  }
}

const mapDispatch = (dispatch) => {
    return {
        submitFarm: (upload, save) => dispatch({type: 'IPFS_UPLOAD_THEN_SAVE', payload: {upload, save}}),
        ipfsUploadAcked: () => dispatch({type: 'IPFS_UPLOAD_ACKED'})
    };
}

export default drizzleConnect(Create, mapState, mapDispatch);
