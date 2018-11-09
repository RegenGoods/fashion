const plot = [
  {
    name: 'gps_coords',
    label: 'GPS Coordinates',
    type: 'gps',
    required: true,
    default: ['','']
  },
  {
    name: 'yield',
    label: 'Yield',
    type: 'decimal',
    required: true,
    default: 0.0
  }
]


export const plotSchema = {
  contract: [],
  offChain: plot
}
