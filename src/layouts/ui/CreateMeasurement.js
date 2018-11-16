import React, { Component, Fragment } from 'react'
import schema from '../../schemas/measurement'
import Create from './Create'

export default ({farmId, plotId}) =>
  <Create
    schema={schema}
    submitArgs={[farmId, plotId]}
    conditionalOptions={true}
    contractSubmit='addMeasurement'
    submitLabel='Submit New Measurement'
    buttonText='Add Measurement'
    dialogText='Fill Out the Fields Below to Add A Measurement' />
