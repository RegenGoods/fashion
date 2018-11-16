pragma solidity ^0.4.24;

import './Multihash.sol';

/** @title Measure. */
contract Measure is Multihash {

  struct Measurement {
    uint256 id;
    uint256 plotId;
    address submittedBy;
    MultiHash info;
  }

  Measurement[] measurements;
  mapping (address => uint256[]) measurementsByAddress;
  mapping (uint256 => uint256[]) measurementsByPlot;

  event MeasurementAdded(uint256 farmId, uint256 plotId, uint256 measurementId);

  function getMeasurement(uint256 _id) public view returns (address, uint256, bytes32, uint8, uint8) {
    Measurement storage measurement = measurements[_id];
    MultiHash storage info = measurement.info;
    return (
      measurement.submittedBy,
      measurement.plotId,
      info.hash,
      info.hashFunction,
      info.size
      );
  }

  function getMeasurementIdsForAddress(address _submitter) public view returns (uint256[]) {
    return measurementsByAddress[_submitter];
  }

  function getMeasurementIdsForPlot(uint256 _id) public view returns (uint256[]) {
    return measurementsByPlot[_id];
  }

}
