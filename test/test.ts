const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");

import Web3 from "web3";
const web3 = new Web3("http://locahost:8545");

//-----------------------------------------------------------------------------
const admin_address = "0x2546BcD3c84621e976D8185a91A922aE77ECEc30";
const admin_pk =
  "0xea6c44ac03bff858b476bba40716402b03e41b8e97e276d1baec7c37d42484a0";

describe("Verify Message", function () {
  async function deploySCFixture() {
    const [Owner, tempAddr] = await ethers.getSigners();

    console.log("----------------- Starting deploy contract ................");
    const TestContract = await ethers.getContractFactory("VerifyMessage");
    const testContract = await TestContract.deploy(admin_address);
    await testContract.deployed();
    console.log("Deployed testContract: ", testContract.address);

    // Fixtures can return anything you consider useful for your tests
    return {
      Owner,
      testContract,
    };
  }

  it("test", async function () {
    this.timeout(20000000000);
    const { Owner, testContract } = await loadFixture(deploySCFixture);

    console.log("-------- Message ---------------------------");
    const nonce = await testContract.nonce(Owner.address);
    console.log("nonce: ", nonce.toString());
    const new_nonce = parseInt(nonce.toString()) + 1;

    const amount = "1000000000000000000";

    const message = web3.eth.abi.encodeParameters(
      ["address", "uint256", "uint256"],
      [Owner.address, amount, BigInt(new_nonce)],
    );

    // hash message
    const mint_hashedMessage = Web3.utils.keccak256(message);
    //-------- Sign Message --------------------------------------------
    const signature = web3.eth.accounts.sign(
      mint_hashedMessage ?? "",
      admin_pk,
    );
    await testContract
      .connect(Owner)
      .verifyMessage(amount, signature.v, signature.r, signature.s);

    const nonce1 = await testContract.nonce(Owner.address);
    console.log("nonce1: ", nonce1.toString());
  });
});
