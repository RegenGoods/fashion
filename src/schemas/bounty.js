const offChain = [
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
