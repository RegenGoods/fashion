pragma solidity ^0.4.24;

import './Farms.sol';
import './Bounties.sol';

/** @title MultiHash. */
contract Regen is Farms, Bounties {

  function claimBounty(uint256 _bountyId, uint256 _farmId) public {
    require(farms[_farmId].owner == msg.sender, 'Must be owner of the farm to claim bounty');
    bounties[_bountyId].claimed = true;
    bounties[_bountyId].farmId = _farmId;
    bountiesClaimedByFarm[_farmId].push(_bountyId);

    emit BountyClaimed(_bountyId, _farmId);
  }

  function resolveBounty(uint256 _bountyId, bool _success) public {
    Bounty storage bounty = bounties[_bountyId];
    require(bounty.creator == msg.sender);
    bounty.isActive = false;
    bounty.success = _success;

    emit BountyResolved(_bountyId, _success);
  }
}
