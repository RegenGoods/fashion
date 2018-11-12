import React, { Component, Fragment } from 'react'
import schema from '../../schemas/plot'
import Create from './Create'

export default ({farmId}) =>
  <Create
    schema={schema}
    submitArgs={[farmId]}
    contractSubmit='addPlot'
    submitLabel='Submit New Plot'
    buttonText='Add Plot'
    dialogText='Fill Out the Fields Below to Add A Plot' />
