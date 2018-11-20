import React from 'react'
import SeasonCard from './SeasonCard'

export default ({seasonIds}) =>
  <div>
    {seasonIds.length ?
      seasonIds.map(id => <SeasonCard key={id} id={id} />)
      :
      'No seasons for this farm'
    }
  </div>
