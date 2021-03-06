import React, { Component, Fragment } from 'react'
import schema from '../../schemas/farm'
import Create from './Create'

export default () =>
  <Create
    schema={schema}
    contractSubmit='addFarm'
    submitLabel='Submit New Farm'
    buttonText='Add Farm'
    dialogText='Fill Out the Fields Below to Add Your Farm' />
