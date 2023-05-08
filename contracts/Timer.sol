// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import OpenZeppelin contracts
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract JACKPOT_BlitzMiner is Ownable {
    // Address of the BUSD token contract
    address public busd = 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56; 

    // Address of the contract that can update the jackpot
    address public mainContract;

    // Timestamp of the last update
    uint256 public moment;

    // Address of the last user to win the jackpot
    address public lastUser;

    // Amount of BUSD tokens added to the pool per hour
    uint256 public amountPerHour;

    // Import SafeERC20 library to safely transfer tokens
    using SafeERC20 for IERC20;

    // Events that will be emitted on certain contract actions
    event GetReward(address _winner, uint256 _reward);
    event UserUpdated(address _newUser, uint256 _timestamp);
    event PoolUpdated(address _lastUser, uint256 _timestamp);

    // Fallback and receive functions that don't do anything
    fallback() external {}
    receive() external payable {}

    // Modifier to restrict function execution to the main contract
    modifier onlyContract() {
        require(msg.sender == mainContract);
        _;
    }

    // Constructor that doesn't do anything
    constructor() {}

    // Function called by the main contract to update the pool with a new amount
    function update(
        uint256 _amount,
        uint256 _time,
        address _user
    ) public onlyContract {
        // Add the new amount to the amountPerHour variable
        amountPerHour += _amount;

        // If this is the first update, set the moment and lastUser variables
        if (moment == 0) {
            moment = _time;
            if (_amount > 5 * 10**17) {
                lastUser = _user;
                emit UserUpdated(lastUser, moment);
            }
            return;
        }

        // If less than one hour has passed since the last update, check if the pool size is greater than the threshold
        if (_time - moment < 3600) {
            if (amountPerHour >= 5 * 10**17) {
                // Update the moment and reset the amountPerHour variable
                moment = _time;
                amountPerHour = 0;
                if (_amount >= 5 * 10**17) {
                    // If the new amount added is greater than the threshold, update the lastUser variable and emit the UserUpdated event
                    lastUser = _user;
                    emit UserUpdated(lastUser, moment);
                }
                // Emit the PoolUpdated event
                emit PoolUpdated(lastUser, moment);
            }
        } else {
            // If more than one hour has passed since the last update, call the getReward function
            getReward(lastUser);
        }
    }

    // Function to set the address of the main contract
    function setContractAddress(address _contractAddress) external onlyOwner {
        require(mainContract == address(0), "Contract address can change only once");
        mainContract = _contractAddress;
    }

    function getReward(address _user) private {
        // If the user address is 0, set it to the main contract address
        if (_user == address(0)) {
            _user = mainContract;
        }

        // Emit the GetReward event
        emit GetReward(_user, poolSize());

        // Transfer the entire pool size of BUSD tokens to the winning user
        IERC20(busd).safeTransfer(_user, poolSize());

        // Reset the moment, lastUser, and amountPerHour variables
        lastUser = address(0);
        moment = 0;
        amountPerHour = 0;
    }

    // Function to get the current size of the pool
    function poolSize() public view returns (uint256) {
        return IERC20(busd).balanceOf(address(this));
    }
}
