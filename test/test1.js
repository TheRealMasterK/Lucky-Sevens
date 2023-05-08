const { expect } = require('chai');
const { BN, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');

const StakingContract = artifacts.require('StakingContract');
const MockToken = artifacts.require('MockToken');

contract('StakingContract', function (accounts) {
  const [owner, user1, user2] = accounts;
  const lockDuration = 60 * 60 * 24 * 7; // 1 week
  let stakingToken;
  let stakingContract;

  beforeEach(async function () {
    stakingToken = await MockToken.new({ from: owner });
    stakingContract = await StakingContract.new(stakingToken.address, { from: owner });
  });

  it('should allow users to stake tokens', async function () {
    const amount = new BN('1000000000000000000'); // 1 ETH
    await stakingToken.approve(stakingContract.address, amount, { from: user1 });
    await stakingContract.stakeTokens(amount, lockDuration, { from: user1 });

    const stakeInfo = await stakingContract.stakes(user1);
    expect(stakeInfo.amount).to.be.bignumber.equal(amount);
    expect(stakeInfo.stakeTimestamp).to.be.bignumber.closeTo(await web3.eth.getBlock('latest').then(b => b.timestamp), 10);
  });

  it('should prevent users from staking 0 tokens', async function () {
    await expectRevert(
      stakingContract.stakeTokens(0, lockDuration, { from: user1 }),
      'Staking amount must be greater than 0'
    );
  });

  it('should prevent users from staking for less than the minimum duration', async function () {
    await expectRevert(
      stakingContract.stakeTokens(new BN('1000000000000000000'), lockDuration - 1, { from: user1 }),
