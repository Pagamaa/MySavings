import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const atmABI = atm_abi.abi;

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(null);
  const [account, setAccount] = useState(null);
  const [atm, setATM] = useState(null);
  const [balance, setBalance] = useState(null);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [isHidden, setIsHidden] = useState(false);

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts.length) {
      setAccount(accounts[0]);
      getATMContract();
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }
    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);
  };

  const getATMContract = () => {
    if (ethWallet) {
      const provider = new ethers.providers.Web3Provider(ethWallet);
      const signer = provider.getSigner();
      const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
      setATM(atmContract);
    }
  };

  const getBalance = async () => {
    if (atm && !isHidden) {
      try {
        const balanceWei = await atm.getBalance();
        const balanceEther = ethers.utils.formatEther(balanceWei);
        setBalance(parseFloat(balanceEther).toFixed(4));
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    }
  };

  const deposit = async () => {
    if (atm && depositAmount) {
      try {
        const tx = await atm.deposit(ethers.utils.parseEther(depositAmount));
        await tx.wait();
        getBalance(); // Update balance after deposit
        setDepositAmount(""); // Clear input
      } catch (error) {
        console.error("Error depositing:", error);
      }
    }
  };

  const withdraw = async () => {
    if (atm && withdrawAmount) {
      try {
        const tx = await atm.withdraw(ethers.utils.parseEther(withdrawAmount));
        await tx.wait();
        getBalance(); // Update balance after withdrawal
        setWithdrawAmount(""); // Clear input
      } catch (error) {
        console.error("Error withdrawing:", error);
      }
    }
  };

  const resetBalance = async () => {
    if (atm) {
      try {
        const tx = await atm.resetBalance();
        await tx.wait();
        setBalance("0.0000"); // Set balance to zero after reset
      } catch (error) {
        console.error("Error resetting balance:", error);
      }
    }
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header><h1>My Savings Account</h1></header>
      {ethWallet ? (
        account ? (
          <div className="account-details">
            <h2>Account Details</h2>
            <p className="account">Your Account: {account}</p>
            <p>Current Balance: {isHidden ? "Hidden" : `${balance} ETH`}</p>
            <input
              type="number"
              placeholder="Enter deposit amount"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
            />
            <button onClick={deposit} disabled={isHidden}>Deposit</button>
            
            <div className="withdraw-section">
              <input
                type="number"
                placeholder="Enter withdrawal amount"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
              />
              <button onClick={withdraw} disabled={isHidden}>Withdraw</button>
            </div>
            
            <button onClick={resetBalance} disabled={isHidden}>Reset Balance</button>
            <button onClick={() => setIsHidden(true)}>Hide Balance</button>
            <button onClick={() => { setIsHidden(false); getBalance(); }}>Unhide Balance</button>
          </div>
        ) : (
          <button onClick={connectAccount}>Connect your MetaMask wallet</button>
        )
      ) : (
        <p>Please install MetaMask to use this Savings Account.</p>
      )}
      <style jsx>{`
        .container {
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: 20px;
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          background-color: #000000; /* Deep Black */
        }
        h1 {
          font-size: 50px;
          color: #00ffff; /* Neon Blue */
        }
        .account-details {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #333; /* Darker border for contrast */
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(255, 0, 255, 0.3); /* Neon Pink shadow */
          background: #1e1e1e; /* Dark Purple Background */
        }
        h2 {
          color: #ffff00; /* Cyber Yellow */
        }
        p {
          font-size: 18px;
          color: #B026FF; /* Neon Purple */
        }
        .account {
          color: #B026FF; /* Neon Purple */
          font-weight: bold;
        }
        input, button {
          margin: 8px;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #333;
          border-radius: 20px;
        }
        input {
          background-color: #2d2d2d; /* Dark Purple */
          color: #fff;
        }
        button {
          color: #fff;
          cursor: pointer;
          background-color: #ff00ff; /* Neon Pink */
        }
        button:disabled {
          background-color: #555;
        }
        button:not(:disabled) {
          background-color: #ff00ff; /* Neon Pink */
        }
        button:hover:not(:disabled) {
          background-color: #cc00cc; /* Darker Neon Pink */
        }
        .withdraw-section {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 10px 0;
        }
        .withdraw-section input {
          margin-right: 10px; /* Space between input and button */
        }
      `}</style>
    </main>
  );
}
