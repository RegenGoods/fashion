const contract = [
  {
    name: 'plots',
    label: 'Plots',
    type: 'select',
    multiple: true,
    options: [],
    default: []
  }
]

const offChain = [
  {
    name: 'good',
    label: 'Good',
    type: 'select',
    required: true,
    default: 'cotton',
    options: [
      {
        value: 'cotton',
        label: 'Cotton'
      },
      {
        value: 'leather',
        label: 'Leather'
      }
    ]
  },
  {
    name: 'start',
    label: 'Start Date',
    type: 'date',
    required: false,
    default:''
  },
  {
    name: 'end',
    label: 'End Date',
    type: 'date',
    required: false,
    default:''
  }
]


export default {
  contract,
  offChain
}
