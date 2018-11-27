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
    name: 'payout',
    label: 'Payout',
    type: 'currency',
    required: true,
    default: 0
  },
  {
    name: 'amount',
    label: 'Amount',
    type: 'integer',
    required: true,
    default: 0
  },
  {
    name: 'deliveryDate',
    label: 'Delivery Date',
    type: 'date',
    required: true,
    default: ''
  }
]

export default {
  contract: [],
  offChain
}
