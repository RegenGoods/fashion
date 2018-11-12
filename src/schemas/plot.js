const plot = [
  {
    name: 'name',
    label: 'Name',
    type: 'string',
    require: false,
    default: ''
  },
  {
    name: 'gps_coords',
    label: 'GPS Coordinates',
    type: 'gps',
    required: true,
    default: ['','']
  }
]


export default {
  contract: [],
  offChain: plot
}
