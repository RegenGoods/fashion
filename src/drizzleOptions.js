import Regen from './../build/contracts/Regen.json'

const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [
    Regen,
  ],
  events: {
    Regen: ['SeasonStarted', 'SeasonClosed', 'FarmAdded', 'BountyAdded', 'BountyResolved']
  },
  polls: {
    accounts: 1500
  }
}

export default drizzleOptions
