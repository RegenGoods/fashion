import React from 'react'
import PlotCard from './PlotCard'

export default ({plotIds, onClick}) =>
  <div>
    {plotIds.length ?
      plotIds.map(id => <PlotCard key={id} id={id} onClick={onClick.bind(this, id)} />)
      :
      'No plots for this farm'
    }
  </div>
