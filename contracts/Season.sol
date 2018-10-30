pragma solidity ^0.4.24;

import './Measure.sol';

/** @title MultiHash. */
contract Season is Measure {

  struct FarmSeason {
    uint256 id;
    uint256 farmId;
    bool isOpen;
    uint256[] measurementIds;
    Multihash info;
    uint256 yieldId;
  }

  struct Yield {
    uint256 id;
    Multihash info;
  }

  FarmSeason[] seasons;
  Yield[] yields;

  event SeasonStarted(uint256 farmId, uint256 seasonId);
  event SeasonClosed(uint256 farmId, uint256 seasonId, uint256 yieldId);

}
