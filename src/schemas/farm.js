const contact = [
  {
    name: 'address',
    label: 'Contact Address',
    type: 'string',
    required: false,
    default: ''
  },
  {
    name: 'phone',
    label: 'Phone Number',
    type: 'phone',
    required: false,
    default: ''
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: false,
    default: ''
  },
  {
    name: 'website',
    label: 'Website',
    type: 'url',
    required: false,
    default: ''
  }
]


const farm = [
  {
    name: 'name',
    label: 'Farm Name',
    type: 'string',
    required: true,
    default: ''
  }
]


export default {
  contract: [],
  offChain: farm.concat(contact)
}
