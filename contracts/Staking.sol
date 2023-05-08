// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Define the StakingContract which inherits from Ownable to allow for administrative functions
contract StakingContract is Ownable {
    // The ERC20 token used for staking
    IERC20 public stakingToken;

    // The minimum duration for staking
    uint256 public constant MIN_DURATION = 1 weeks;

    // Struct to store user staking information
    struct StakeInfo {
        uint256 amount;
        uint256 stakeTimestamp;
    }

    // Mapping to store each user's staking information
    mapping(address => StakeInfo) public stakes;

    // Keep track of the total amount staked in the contract
    uint256 public totalStaked;

    // Events to log staking, withdrawal, and reward claiming actions
    event Staked(address indexed user, uint256 amount, uint256 lockDuration);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 rewardAmount);

    // Initialize the staking contract with the ERC20 token address
    constructor(IERC20 _stakingToken) {
        stakingToken = _stakingToken;
    }

    // Function for users to stake their tokens
    function stakeTokens(uint256 _amount, uint256 _lockDuration) external {
        // Ensure staking amount is greater than 0 and lock duration is at least the minimum duration
        require(_amount > 0, "Staking amount must be greater than 0");
        require(_lockDuration >= MIN_DURATION, "Lock duration is less than the minimum duration");

        // Retrieve user's current stake information
        StakeInfo storage userStake = stakes[msg.sender];

        // Update the user's stake information
        userStake.amount += _amount;
        userStake.stakeTimestamp = block.timestamp;

        // Increase the total amount staked in the contract
        totalStaked += _amount;

        // Transfer tokens from the user to the contract
        stakingToken.transferFrom(msg.sender, address(this), _amount);

        // Emit the Staked event
        emit Staked(msg.sender, _amount, _lockDuration);
    }

    // Function to allow users to withdraw their staked tokens
    function withdrawTokens() external {
        // Retrieve user's stake information
        StakeInfo storage userStake = stakes[msg.sender];

        // Check if the lock-up period has passed
        require(block.timestamp >= userStake.stakeTimestamp + 1 weeks, "Staking period has not passed");

        // Transfer the staked tokens back to the user
        stakingToken.transfer(msg.sender, userStake.amount);

        // Emit the Withdrawn event
        emit Withdrawn(msg.sender, userStake.amount);

        // Reset the user's stake information and reduce the total staked amount
        totalStaked -= userStake.amount;
        userStake.amount = 0;
        userStake.stakeTimestamp = 0;
    }

    // Function for users to claim their rewards
    function claimRewards() external {
        // Check if the lock-up period has passed
        StakeInfo storage userStake = stakes[msg.sender];
        require(block.timestamp >= userStake.stakeTimestamp + 1 weeks, "Staking period has not passed");

        // Calculate user's rewards based on their staking information
        uint256 rewardAmount = calculateRewards(msg.sender);

        // Transfer the reward tokens to the user
        stakingToken.transfer(msg.sender, rewardAmount);

        // Emit the RewardClaimed event
        emit RewardClaimed(msg.sender, rewardAmount);
    }

    // Function to calculate rewards based on staking information
    function calculateRewards(address _user) public view returns (uint256) {
        // Placeholder reward calculation logic
        // Implement your reward calculation logic based on the staking amount and duration
        StakeInfo storage userStake = stakes[_user];
        uint256 rewardAmount = userStake.amount * 1; // Replace with your reward calculation formula

        return rewardAmount;
    }

    // Function to check if a user is eligible to claim rewards
    function canClaimRewards(address _user) public view returns (bool) {
        StakeInfo storage userStake = stakes[_user];
        return block.timestamp >= userStake.stakeTimestamp + 1 weeks;
    }
}
