import React, { Component, Fragment } from 'react'
import schema from '../../schemas/season'
import Create from './Create'

export default ({farmId, plotOptions}) => {
  const seasonSchema = {...schema,contract:schema.contract.map(f=>f.name === 'plots' ? {...f, options:plotOptions} : f)}
  return (<Create
    schema={seasonSchema}
    submitArgs={[farmId]}
    contractSubmit='addSeason'
    submitLabel='Submit New Season'
    buttonText='Add Season'
    dialogText='Fill Out the Fields Below to Add A Season' />)
  }
