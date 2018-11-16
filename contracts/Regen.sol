pragma solidity ^0.4.24;

import './Farms.sol';
import './Bounties.sol';

/** @title MultiHash. */
contract Regen is Farms, Bounties {

  function bidForBounty(uint256 _bountyId, uint256 _farmId) public onlyFarmOwner(_farmId) {
    Bounty storage bounty = bounties[_bountyId];
    bounty.bidders.push(_farmId);
    emit BountyBid(_bountyId, _farmId);
  }

  function resolveBounty(uint256 _bountyId, bool _success) public {
    Bounty storage bounty = bounties[_bountyId];
    require(bounty.creator == msg.sender);
    bounty.isActive = false;
    bounty.success = _success;

    emit BountyResolved(_bountyId, _success);
  }
}
