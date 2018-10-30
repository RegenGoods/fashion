pragma solidity ^0.4.24;

import './Multihash.sol';

/** @title Measure. */
contract Measure is MultiHash {

  struct Measurement {
    uint256 id;
    address submittedBy;
    Multihash info;
  }

  Measurement[] measurements;
  mapping (address => uint256[]) measurementsByAddress;

}
