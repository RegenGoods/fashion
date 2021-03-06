pragma solidity ^0.4.24;

/** @title MultiHash. */
contract Multihash {

  struct MultiHash {
    bytes32 hash;
    uint8 hashFunction;
    uint8 size;
  }

  function createMultihash(bytes32 _hash, uint8 _hashFunction, uint8 _size) internal pure returns (MultiHash multihash) {
      multihash = MultiHash(_hash, _hashFunction, _size);
      return multihash;
  }
}
