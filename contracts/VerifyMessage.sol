// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract VerifyMessage is Ownable2Step {
    using Address for address;
    mapping(address => uint256) public nonce;

    address public admin;

    constructor(address _admin) {
        admin = _admin;
    }

    function setAdmin(address _admin) external onlyOwner {
        admin = _admin;
    }

    function getPrefixedHashMessage(address _user, uint256 _amount, uint256 _nonce) public pure returns (bytes32) {
        bytes32 _hashedData = keccak256(abi.encode(_user, _amount, _nonce));
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        return keccak256(abi.encodePacked(prefix, _hashedData));
    }

    function verifyMessage(uint256 _amount, uint8 _v, bytes32 _r, bytes32 _s) external {
        bytes32 prefixedHashMessage = getPrefixedHashMessage(msg.sender, _amount, nonce[msg.sender] + 1);
        address signer = ecrecover(prefixedHashMessage, _v, _r, _s);
        require(signer == admin, "Invalid admin");
        nonce[msg.sender]++;
    }
}
