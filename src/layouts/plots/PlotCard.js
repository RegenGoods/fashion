import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { getMultihash } from '../../util/multihash'
import {formatGroupInfo, formatGroupData, combineGroupDataAndInfo} from '../../util/formatResponse'

import getIpfsContent from '../../util/getIpfsContent'



class PlotCard extends Component {
  constructor (props, context) {
    super(props)
    this.farmId = props.match.params.farmId
    this.methods = context.drizzle.contracts.Regen.methods
    this.plotKey = this.methods.getPlot.cacheCall(props.id)
  }

  getRenderValues = () => {
    return {
      plotResponse: this.props.Regen.getPlot[this.plotKey] ?
        Object.values(this.props.Regen.getPlot[this.plotKey].value) : null,
    }
  }

  render () {
    const { account, id, match, onClick, hashedContent, getIpfs } = this.props
    const { plotResponse } = this.getRenderValues();
    let plot = 'loading';

    if (Array.isArray(plotResponse)) {
      const hash = getMultihash(plotResponse.slice(1))
      if (!hashedContent[hash]) {
        getIpfs(hash, false)
      } else {
      let plotData = hashedContent[hash]
        plot = <div>
        <div>
          name: {plotData.name}
        </div>
        <div>
          bbox: {plotData.boundingBox }
        </div>
        </div>
      }
    }

    return (
      <div onClick={onClick}>
      <Link to={`${match.url}?plot=${id}`}>
        {plot}
      </Link>
      </div>
    )
  }
}

PlotCard.contextTypes = {
  drizzle: PropTypes.object
}

const mapState = state => {
  return {
    address: state.accounts[0],
    Regen: state.contracts.Regen,
    hashedContent: state.data.hashedContent
  }
}

const mapDispatch = dispatch => ({
  getIpfs: (hash, noParse) => getIpfsContent(dispatch, hash, noParse)
})

export default withRouter(drizzleConnect(PlotCard, mapState, mapDispatch));
