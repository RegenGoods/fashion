pragma solidity ^0.4.24;

import './Season.sol';
import './Bounty.sol';

/** @title MultiHash. */
contract Regen is Season, CropBounty {

  struct Farm {
    uint256 id;
    address owner;
    Multihash info;
    uint256[] seasons;
  }

  Farm[] public farms;
  mapping (address => uint256[]) public ownerFarms;

  event FarmAdded(uint256 id, address owner);
  event SeasonAdded(uint256 farmId, uint256 seasonId);
  event MeasurementAdded(uint256 farmId, uint256 seasonId, uint256 measurementId);

  modifier onlyFarmOwner(uint256 _farmId) {
    require(farms[_farmId].owner == msg.sender, 'Must be owner of farm to create a season');
    _;
  }

  function addFarm(bytes32 _hash, uint8 _hashFunction, uint8 _size) public {
      Multihash memory info = Multihash(_hash, _hashFunction, _size);
      uint256[] memory seasons;
      Farm memory farm = Farm(farms.length, msg.sender, info, seasons);
      farms.push(farm);
      ownerFarms[msg.sender].push(farm.id);
      emit FarmAdded(farm.id, farm.owner);
  }


  function addSeason(uint256 _farmId, bytes32 _hash, uint8 _hashFunction, uint8 _size) public onlyFarmOwner(_farmId) {
    Multihash memory info = Multihash(_hash, _hashFunction, _size);
    uint256[] memory measurementIds;
    FarmSeason memory season = FarmSeason(seasons.length, _farmId, false, measurementIds, info, 0);
    farms[_farmId].seasons.push(season.id);
    seasons.push(season);
    emit SeasonAdded(_farmId, season.id);

  }

  function addMeasurement(uint256 _farmId, uint256 _seasonId, bytes32 _hash, uint8 _hashFunction, uint8 _size) public {
    FarmSeason storage season = seasons[farms[_farmId].seasons[_seasonId]];
    require(season.isOpen, 'Season is not open');
    Multihash memory info = Multihash(_hash, _hashFunction, _size);
    Measurement memory measurement = Measurement(measurements.length, msg.sender, info);
    measurements.push(measurement);
    uint256[] storage measurementIds = season.measurementIds;
    measurementIds.push(measurement.id);
    measurementsByAddress[msg.sender].push(measurement.id);

    emit MeasurementAdded(_farmId, _seasonId, measurement.id);
  }

  function claimBounty(uint256 _bountyId, uint256 _farmId) public {
    require(farms[_farmId].owner == msg.sender, 'Must be owner of the farm to claim bounty');
    bounties[_bountyId].claimed = true;
    bounties[_bountyId].farmId = _farmId;
    bountiesClaimedByFarm[_farmId].push(_bountyId);

    emit BountyClaimed(_bountyId, _farmId);

  }

  function startSeason(uint256 _farmId, uint256 _seasonId) public onlyFarmOwner(_farmId) {
    FarmSeason storage season = seasons[_seasonId];
    require(season.farmId == _farmId);
    season.isOpen = true;


    emit SeasonStarted(_farmId, _seasonId);
  }

  function closeSeason(uint256 _farmId, uint256 _seasonId, bytes32 _hash, uint8 _hashFunction, uint8 _size) public onlyFarmOwner(_farmId) {
    FarmSeason storage season = seasons[_seasonId];
    require(season.farmId == _farmId);
    Multihash memory yieldInfo = Multihash(_hash, _hashFunction, _size);
    Yield memory yield = Yield(yields.length, yieldInfo);
    season.isOpen = false;
    season.yieldId = yield.id;

    emit SeasonClosed(_farmId, _seasonId, yield.id);
  }

  function resolveBounty(uint256 _bountyId, bool _success) public {
    Bounty storage bounty = bounties[_bountyId];
    require(bounty.creator == msg.sender);
    bounty.isActive = false;
    bounty.success = _success;

    emit BountyResolved(_bountyId, _success);
  }



  function getOwnerFarmIds(address _owner) public view returns (uint256[]) {
    return ownerFarms[_owner];
  }
}
