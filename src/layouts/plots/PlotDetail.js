import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'

import { getMultihash } from '../../util/multihash'
import {formatGroupInfo, formatGroupData, combineGroupDataAndInfo} from '../../util/formatResponse'

import getIpfsContent from '../../util/getIpfsContent'
import CreateMeasurement from '../ui/CreateMeasurement'
import Measurement from '../measurements/MeasurementItem'
import PlotItem from '../plots/PlotItem'
import SeasonItem from '../seasons/SeasonItem'


class Detail extends Component {
  constructor (props, context) {
    super(props)
    this.methods = context.drizzle.contracts.Regen.methods
    this.plotKey = this.methods.getPlot.cacheCall(props.id)
    this.measurementIdsKey = this.methods.getPlotMeasurementIds.cacheCall(props.id)
  }

  getRenderValues = () => {
    return {
      plotResponse: this.props.Regen.getPlot[this.plotKey] ?
        Object.values(this.props.Regen.getPlot[this.plotKey].value) : null,
      measurementIdsResponse: this.props.Regen.getPlotMeasurementIds[this.measurementIdsKey] ?
        Object.values(this.props.Regen.getPlotMeasurementIds[this.measurementIdsKey].value) : null,
    }
  }

  render () {
    const { account, id, farmId, getIpfs, hashedContent } = this.props
    const { plotResponse, measurementIdsResponse } = this.getRenderValues();
    let plot = 'loading'
    let measurementIds = 'loading'

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

    if (Array.isArray(measurementIdsResponse)) {
      measurementIds = measurementIdsResponse.map(id => <Measurement id={id} />)
    }

    return (
      <div>
        {plot}
        <div>
          <h5>
            Measurements
          </h5>
          <CreateMeasurement farmId={farmId} plotId={id} />
          {measurementIds}
        </div>
      </div>
    )

  }
}

Detail.contextTypes = {
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

export default drizzleConnect(Detail, mapState, mapDispatch);
