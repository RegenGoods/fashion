pragma solidity ^0.4.24;

import './Multihash.sol';

/** @title MultiHash. */
contract Seasons is Multihash {

  struct Season {
    uint256 id;
    uint256 farmId;
    uint256 yieldId;
    bool isComplete;
    uint256[] plotIds;
    MultiHash info;
  }

  struct Yield {
    uint256 id;
    MultiHash info;
  }

  Season[] seasons;
  Yield[] yields;

  event SeasonAdded(uint256 farmId, uint256 seasonId);
  event SeasonStarted(uint256 farmId, uint256 seasonId);
  event SeasonClosed(uint256 farmId, uint256 seasonId, uint256 yieldId);

  function getSeason(uint256 _id) public view returns (uint256 farmId, uint256 yieldId, bool isComplete, bytes32 hash, uint8 hashFunction, uint8 size) {
    return (
      seasons[_id].farmId,
      seasons[_id].yieldId,
      seasons[_id].isComplete,
      seasons[_id].info.hash,
      seasons[_id].info.hashFunction,
      seasons[_id].info.size
    );
  }

  function getSeasonPlotIds(uint256 _id) public view returns (uint256[]) {
    return seasons[_id].plotIds;
  }

}
