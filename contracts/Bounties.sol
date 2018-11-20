pragma solidity ^0.4.24;

import './Multihash.sol';

/** @title Bounty */
contract Bounties is Multihash {

  struct Bounty {
    uint256 id;
    uint256 farmId;
    uint256 seasonId;
    MultiHash info;
    address creator;
    uint256[] bidders;
    bool claimed;
    bool isActive;
    bool success;
  }

  Bounty[] bounties;
  mapping (address => uint256[]) bountiesForOwner;
  mapping (uint256 => uint256[]) bountiesClaimedByFarm;

  event BountyAdded(uint256 id);
  event BountyBid(uint256 id, uint256 farmId);
  event BountyAssigned(uint256 id, uint256 farmId);
  event BountyResolved(uint256 id, bool success);

  function addBounty(bytes32 _hash, uint8 _hashFunction, uint8 _size) public {
    MultiHash memory info = createMultihash(_hash, _hashFunction, _size);
    uint256[] memory bidders;
    Bounty memory bounty = Bounty(bounties.length, 0, 0, info, msg.sender, bidders, false, true, false);
    bounties.push(bounty);
    bountiesForOwner[msg.sender].push(bounty.id);
  }

  function assignBounty(uint256 _id, uint256 _farmId, uint256 _bidderIdx) public {
    Bounty storage bounty = bounties[_id];
    require(bounty.bidders[_bidderIdx] == _farmId, 'Farm Id bidder Idx mismatch');
    bounty.claimed = true;
    bounty.farmId = _farmId;
    bountiesClaimedByFarm[_farmId].push(bounty.id);

    emit BountyAssigned(_id, _farmId);
  }

  function getBountyCount() public view returns (uint256) {
    return bounties.length;
  }

  function getBountyIdsForOwner (address _owner) public view returns (uint256[]) {
    return bountiesForOwner[_owner];
  }

  function getBountyIdsForFarm (uint256 _id) public view returns (uint256[]) {
    return bountiesClaimedByFarm[_id];
  }

  function getBounty(uint256 _id) public view returns (uint256, uint256, address, uint256[], bool, bool, bool, bytes32, uint8, uint8) {
    Bounty storage bounty = bounties[_id];
    return (
      bounty.farmId,
      bounty.seasonId,
      bounty.creator,
      bounty.bidders,
      bounty.claimed,
      bounty.isActive,
      bounty.success,
      bounty.info.hash,
      bounty.info.hashFunction,
      bounty.info.size
    );
  }
}
