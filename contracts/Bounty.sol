pragma solidity ^0.4.24;

import './Multihash.sol';

/** @title Bounty */
contract CropBounty is MultiHash {

  struct Bounty {
    uint256 id;
    uint256 farmId;
    uint256 seasonId;
    Multihash info;
    address creator;
    bool claimed;
    bool isActive;
    bool success;
  }

  Bounty[] bounties;
  mapping (address => uint256[]) bountiesForOwner;
  mapping (uint256 => uint256[]) bountiesClaimedByFarm;

  event BountyAdded(uint256 id);
  event BountyClaimed(uint256 id, uint256 farmId);
  event BountyResolved(uint256 id, bool success);

  function addBounty(bytes32 _hash, uint8 _hashFunction, uint8 _size) public {
    Multihash memory info = createMultihash(_hash, _hashFunction, _size);
    Bounty memory bounty = Bounty(bounties.length, 0, 0, info, msg.sender, false, true, false);
    bounties.push(bounty);
    bountiesForOwner[msg.sender].push(bounty.id);
  }
}
