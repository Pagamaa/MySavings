// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 private balance;
    bool public isHidden;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event BalanceReset();
    event BalanceHidden();
    event BalanceUnhidden();

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
        isHidden = false;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner of this account");
        _;
    }

    function getBalance() public view returns(uint256) {
        require(!isHidden, "Balance is hidden");
        return balance;
    }

    function deposit(uint256 _amount) public payable onlyOwner {
        uint _previousBalance = balance;

        // perform transaction
        balance += _amount;

        // assert transaction completed successfully
        assert(balance == _previousBalance + _amount);

        // emit the event
        emit Deposit(_amount);
    }

    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public onlyOwner {
        uint _previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }

        // withdraw the given amount
        balance -= _withdrawAmount;

        // assert the balance is correct
        assert(balance == (_previousBalance - _withdrawAmount));

        // emit the event
        emit Withdraw(_withdrawAmount);
    }

    function resetBalance() public onlyOwner {
        uint256 _currentBalance = balance;
        if (_currentBalance == 0) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: 0
            });
        }
        balance = 0;
        emit Withdraw(_currentBalance);
        emit BalanceReset();
    }

    function hideBalance() public onlyOwner {
        isHidden = true;
        emit BalanceHidden();
    }

    function unhideBalance() public onlyOwner {
        isHidden = false;
        emit BalanceUnhidden();
    }
}
