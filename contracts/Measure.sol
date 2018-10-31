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

  event MeasurementAdded(uint256 farmId, uint256 seasonId, uint256 measurementId);

  function getMeasurement(uint256 _id) public view returns (address, bytes32, uint8, uint8) {
    Measurement storage measurement = measurements[_id];
    Multihash storage info = measurement.info;
    return (
      measurement.submittedBy,
      info.hash,
      info.hashFunction,
      info.size
      );
  }

  function getMeasurementIdsForAddress(address _submitter) public view returns (uint256[]) {
    return measurementsByAddress[_submitter];
  }

}
