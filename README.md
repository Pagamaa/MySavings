# My Savings account

This project is a decentralized application (DApp) built on Ethereum using Solidity smart contracts and React. It allows users to interact with a savings account smart contract with additional features such as balance hiding and resetting.


## Project Overview

The SavingsAccount consists of a smart contract deployed on the Ethereum blockchain and a React frontend for user interaction. The smart contract (`Assessment`) allows for deposits and withdrawals, and includes functionalities to hide or reset the balance.

The frontend is styled with a Cyberpunk 2077-inspired theme, featuring neon colors and a futuristic design.

## Contract Details

### Smart Contract

**File:** `Assessment.sol`

**Description:**
- `Assessment` contract allows deposits and withdrawals.
- Only the contract owner can interact with the contract.
- Balance visibility can be controlled by hiding or unhiding it.
- Balance can be reset to zero.

**Functions:**
- `constructor(uint initBalance)` - Initializes the contract with a starting balance.
- `getBalance()` - Returns the current balance of the contract if it is not hidden.
- `deposit(uint256 _amount)` - Deposits the specified amount (only callable by the owner).
- `withdraw(uint256 _withdrawAmount)` - Withdraws the specified amount (only callable by the owner).
- `resetBalance()` - Resets the balance to zero (only callable by the owner).
- `hideBalance()` - Hides the balance from view (only callable by the owner).
- `unhideBalance()` - Reveals the balance (only callable by the owner).

**Events:**
- `Deposit(uint256 amount)` - Emitted when a deposit is made.
- `Withdraw(uint256 amount)` - Emitted when a withdrawal is made.
- `BalanceReset()` - Emitted when the balance is reset.
- `BalanceHidden()` - Emitted when the balance is hidden.
- `BalanceUnhidden()` - Emitted when the balance is revealed.

**Custom Error:**
- `InsufficientBalance(uint256 balance, uint256 withdrawAmount)` - Reverts with detailed error if the balance is insufficient for a withdrawal or reset.

### ABI and Address

- **ABI File:** `../artifacts/contracts/Assessment.sol/Assessment.json`
- **Contract Address:** `0x5FbDB2315678afecb367f032d93F642f64180aa3`

## Frontend Details

**File:** `HomePage.jsx`

**Description:**
- React component that interacts with the Ethereum smart contract.
- Allows users to deposit, withdraw, reset, hide, and unhide the balance.
- Displays the current balance and handles visibility based on user actions.

**State Variables:**
- `ethWallet` - MetaMask wallet instance.
- `account` - Current Ethereum account address.
- `atm` - Instance of the Ethereum smart contract.
- `balance` - Current balance of the savings account.
- `depositAmount` - Amount to deposit.
- `withdrawAmount` - Amount to withdraw.
- `isHidden` - Boolean to control balance visibility.

**Key Functions:**
- `getWallet()` - Initializes and retrieves the MetaMask wallet instance.
- `handleAccount(accounts)` - Handles Ethereum accounts and sets up the smart contract.
- `connectAccount()` - Connects the user's MetaMask wallet.
- `getATMContract()` - Retrieves and sets the smart contract instance.
- `getBalance()` - Fetches and updates the current balance from the smart contract.

**Styles:**
- Styled using CSS-in-JS with a Cyberpunk 2077-inspired color scheme.

## Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Pagamaa/MySavings
   cd MySavings

2. **Install Dependencies:**
   npm install
3. **Compile and Deploy the Smart Contract:**
   npx hardhat compile
   npx hardhat run scripts/deploy.js
4. **Start the Development Server:**
   npm run dev
5. **Open the Application:**
Navigate to http://localhost:3000 in your browser.
