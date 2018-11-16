const typeOptions = {
  waterTable: [
    {
      name: 'level',
      label: 'Level',
      type: 'integer',
      required: true,
      default: 0
    }
  ],
  bioDiversity: [
    {
      name: 'level',
      label: 'Level',
      type: 'integer',
      required: true,
      default: 0
    }
  ],
  soilCarbon: [
    {
      name: 'level',
      label: 'Level',
      type: 'integer',
      required: true,
      default: 0
    }
  ]
}

const offChain = [
  {
    name: 'measurementType',
    label: 'Measurement Type',
    type: 'select',
    required: false,
    default: 'soilCarbon',
    options: [
      {
        value: 'waterTable',
        label: 'Water Table'
      },
      {
        value: 'bioDiversity',
        label: 'Bio Diversity'
      },
      {
        value: 'soilCarbon',
        label: 'Soil Carbon'
      }
    ]
  },
  {
    name: 'level',
    label: 'Level',
    type: 'integer',
    required: true,
    default: 0
  }
]

export default {
  contract: [],
  offChain,
  typeOptions
}
