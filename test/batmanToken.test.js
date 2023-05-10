const { expect } = require('chai');
const { BN, ether, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const BatmanToken = artifacts.require('BatmanToken');


contract('BatmanToken', function (accounts) {
  const [owner, account1, account2] = accounts;
  const initialSupply = ether('1000000'); // 1,000,000 BAT
  const stakeAmount = ether('100');

  beforeEach(async function () {
    this.token = await BatmanToken.new({ from: owner });
    // Transfer tokens to account1 for staking
    await this.token.transfer(account1, stakeAmount, { from: owner });
  });

  describe('Staking functionality', function () {
    it('allows a user to stake tokens', async function () {
      await this.token.stake(stakeAmount, { from: account1 });
      const stakedTokens = await this.token.staked(account1);
      expect(stakedTokens).to.be.bignumber.equal(stakeAmount);
    });

    it('updates the total staked tokens', async function () {
      await this.token.stake(stakeAmount, { from: account1 });
      const totalStakedTokens = await this.token.totalStaked();
      expect(totalStakedTokens).to.be.bignumber.equal(stakeAmount);
    });

    it('does not allow a user to stake more tokens than their balance', async function () {
      const excessStakeAmount = stakeAmount.add(ether('10'));
      await expectRevert(
        this.token.stake(excessStakeAmount, { from: account1 }),
        'Amount must be greater than 0'
      );
    });

    it('allows a user to unstake tokens', async function () {
      await this.token.stake(stakeAmount, { from: account1 });
      await this.token.unstake(stakeAmount, { from: account1 });
      const stakedTokens = await this.token.staked(account1);
      expect(stakedTokens).to.be.bignumber.equal('0');
    });

    it('does not allow a user to unstake more tokens than they have staked', async function () {
      await this.token.stake(stakeAmount, { from: account1 });
      const excessUnstakeAmount = stakeAmount.add(ether('10'));
      await expectRevert(
        this.token.unstake(excessUnstakeAmount, { from: account1 }),
        'Not enough tokens staked'
      );
    });

    it('allows a user to claim rewards', async function () {
      await this.token.stake(stakeAmount, { from: account1 });
      await this.token.claimRewards({ from: account1 });

      // Since block times may vary, we'll check if the user has received any rewards
      const account1Balance = await this.token.balanceOf(account1);
      expect(account1Balance).to.be.bignumber.gt('0');
    });

    it('calculates pending rewards correctly', async function () {
      await this.token.stake(stakeAmount, { from: account1 });

      // Simulate a few blocks passing (e.g., 10 blocks)
      const blocksPassed = new BN('10');
      const rewardPerBlock = await this.token.rewardRate();
      const expectedRewards = stakeAmount.mul(blocksPassed).mul(rewardPerBlock);

      const pendingRewards = await this.token.getPendingRewards(account1);
      expect(pendingRewards).to.be.bignumber.equal(expectedRewards);
    });
  });
});
