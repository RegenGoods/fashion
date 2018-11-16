const plot = [
  {
    name: 'name',
    label: 'Name',
    type: 'string',
    require: false,
    default: ''
  },
  {
    name: 'bounding_box',
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
