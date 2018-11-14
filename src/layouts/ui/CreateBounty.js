import React, { Component, Fragment } from 'react'
import schema from '../../schemas/bounty'
import Create from './Create'

export default () =>
  <Create
    schema={schema}
    contractSubmit='addBounty'
    submitLabel='Submit New Bounty'
    buttonText='Add Bounty'
    dialogText='Fill Out the Fields Below to Add Your Bounty' />
