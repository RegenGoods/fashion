pragma solidity ^0.4.24;

import './Multihash.sol';

/** @title Plots. */
contract Plots is Multihash {

  struct Plot {
    uint256 id;
    uint256 farmId;
    uint256[] measurementIds;
    MultiHash info;
  }

  Plot[] public plots;

  event PlotAdded(uint256 id, uint256 farmId);
  modifier plotsAreInFarm(uint256[] _plotIds, uint256 _farmId) {
    for (uint i = 0; i<_plotIds.length;i++) {
      require(plots[_plotIds[i]].farmId == _farmId, 'Plot is not in farm');
    }
    _;
  }

  function getPlot(uint256 _id) public view returns (uint256, bytes32, uint8, uint8) {
    Plot storage plot = plots[_id];
    return (
      plot.farmId,
      plot.info.hash,
      plot.info.hashFunction,
      plot.info.size
      );
  }

  function getPlotMeasurementIds(uint256 _id) public view returns (uint256[]) {
    return plots[_id].measurementIds;
  }

}
