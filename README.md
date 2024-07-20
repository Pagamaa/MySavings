# My Savings Account 

## Overview

This project is a decentralized application for managing savings using Ethereum smart contracts. Built with React and ethers.js, it interacts with a Solidity smart contract to provide functionalities for depositing, withdrawing, and managing balance in a user-friendly interface.

The Savings Account features a Cyberpunk 2077-inspired theme with neon colors and a futuristic design.

## Features

- Connects to MetaMask wallet
- Displays account details and balance
- Allows depositing and withdrawing ETH
- Option to reset balance
- Option to hide and unhide balance

## Technologies

- **React**: Frontend framework for building user interfaces
- **ethers.js**: Ethereum library for interacting with the blockchain
- **Solidity**: Programming language for smart contracts
- **MetaMask**: Ethereum wallet extension

### Installation

1. Clone the repository:

   ```bash
   [git clone https://github.com/yourusername/cyberpunk-savings-account.git](https://github.com/Pagamaa/MySavings)
Navigate to the project directory:

bash
Copy code
cd cyberpunk-savings-account
Install the dependencies:

bash
Copy code
npm install
Configuration
Create a .env file in the root directory of the project.

Add your Ethereum network and smart contract details to the .env file:

env
Copy code
REACT_APP_ETHEREUM_PROVIDER=https://your-ethereum-provider-url
REACT_APP_CONTRACT_ADDRESS=your-smart-contract-address
Running the Application
To start the development server, use the following command:

bash
Copy code
npm start
Navigate to http://localhost:3000 in your browser to view the application.

Build
To create a production build of the application, run:

bash
Copy code
npm run build
The build artifacts will be stored in the build directory.
