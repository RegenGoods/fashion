pragma solidity ^0.4.24;

import './Seasons.sol';

/** @title Plots. */
contract Plots is Seasons {

  struct Plot {
    uint256 id;
    Multihash info;
  }

  Plot[] public plots;

  event PlotAdded(uint256 id, uint256 farmId);



}
