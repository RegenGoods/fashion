const plot = [
  {
    name: 'name',
    label: 'Name',
    type: 'string',
    require: false,
    default: ''
  },
  {
    name: 'boundingBox',
    label: 'GPS Coordinates',
    type: 'bbox',
    required: true,
    default: ['','']
  }
]


export default {
  contract: [],
  offChain: plot
}
