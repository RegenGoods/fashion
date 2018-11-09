pragma solidity ^0.4.24;

import './Seasons.sol';
import './Plots.sol';

/** @title MultiHash. */
contract Farms is Seasons, Plots {

  struct Farm {
    uint256 id;
    address owner;
    Multihash info;
    uint256[] seasonIds;
    uint256[] plotIds;
  }

  Farm[] public farms;
  mapping (address => uint256[]) public ownerFarms;

  event FarmAdded(uint256 id, address owner);

  modifier onlyFarmOwner(uint256 _farmId) {
    require(farms[_farmId].owner == msg.sender, 'Must be owner of farm');
    _;
  }

  function addFarm(bytes32 _hash, uint8 _hashFunction, uint8 _size) public {
      Multihash memory info = Multihash(_hash, _hashFunction, _size);
      uint256[] memory seasonIds;
      uint256[] memory plotIds;
      Farm memory farm = Farm(farms.length, msg.sender, info, seasonIds, plotIds);
      farms.push(farm);
      ownerFarms[msg.sender].push(farm.id);

      emit FarmAdded(farm.id, farm.owner);
  }

  function addPlot(uint256 _id, bytes32 _hash, uint8 _hashFunction, uint8 _size) public onlyFarmOwner(_id) {
      Farm storage farm = farms[_id];
      Multihash memory info = Multihash(_hash, _hashFunction, _size);
      Plot memory plot = Plot(plots.length, info);
      farm.plotIds.push(plot.id);

      emit PlotAdded(plot.id, farm.id);
  }


  function addSeason(uint256 _farmId, bytes32 _hash, uint8 _hashFunction, uint8 _size) public onlyFarmOwner(_farmId) {
    Multihash memory info = Multihash(_hash, _hashFunction, _size);
    uint256[] memory measurementIds;
    uint256[] memory plotIds;
    Season memory season = Season(seasons.length, _farmId, 0, false, measurementIds, plotIds, info);
    farms[_farmId].seasonIds.push(season.id);
    seasons.push(season);

    emit SeasonAdded(_farmId, season.id);
  }

  function addMeasurement(uint256 _farmId, uint256 _seasonId, bytes32 _hash, uint8 _hashFunction, uint8 _size) public {
    Season storage season = seasons[farms[_farmId].seasonIds[_seasonId]];
    require(season.isComplete == false, 'Season is complete');
    Multihash memory info = Multihash(_hash, _hashFunction, _size);
    Measurement memory measurement = Measurement(measurements.length, msg.sender, info);
    measurements.push(measurement);
    uint256[] storage measurementIds = season.measurementIds;
    measurementIds.push(measurement.id);
    measurementsByAddress[msg.sender].push(measurement.id);

    emit MeasurementAdded(_farmId, _seasonId, measurement.id);
  }

  function closeSeason(uint256 _farmId, uint256 _seasonId, bytes32 _hash, uint8 _hashFunction, uint8 _size) public onlyFarmOwner(_farmId) {
    Season storage season = seasons[_seasonId];
    require(season.farmId == _farmId);
    Multihash memory yieldInfo = Multihash(_hash, _hashFunction, _size);
    Yield memory yield = Yield(yields.length, yieldInfo);
    season.isComplete = true;
    season.yieldId = yield.id;

    emit SeasonClosed(_farmId, _seasonId, yield.id);
  }

  function getFarmsCount () public view returns (uint256) {
    return farms.length;
  }

  function getOwnerFarmIds(address _owner) public view returns (uint256[]) {
    return ownerFarms[_owner];
  }

  function getFarm(uint256 _id) public view returns (address, bytes32, uint8, uint8) {
    return (
      farms[_id].owner,
      farms[_id].info.hash,
      farms[_id].info.hashFunction,
      farms[_id].info.size
      );
  }

  function getFarmSeasonAndPlotIds(uint256 _id) public view returns (uint256[], uint256[]) {
    return (farms[_id].seasonIds, farms[_id].plotIds);
  }
}
