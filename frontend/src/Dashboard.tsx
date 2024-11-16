import React from "react";

interface DashboardProps {
  getUserInfo: () => Promise<void>;
  authenticateUser: () => Promise<void>;
  getAccounts: () => Promise<void>;
  getBalance: () => Promise<void>;
  addChain: () => Promise<void>;
  switchChain: () => Promise<void>;
  signMessage: () => Promise<void>;
  sendTransaction: () => Promise<void>;
  registerPasskey: () => Promise<void>;
  listAllPasskeys: () => Promise<void>;
  showCheckout: () => Promise<void>;
  showWalletUI: () => Promise<void>;
  showWalletScanner: () => Promise<void>;
  logout: () => Promise<void>;
}

const Dashboard: React.FC<DashboardProps> = ({
  getUserInfo,
  authenticateUser,
  getAccounts,
  getBalance,
  addChain,
  switchChain,
  signMessage,
  sendTransaction,
  registerPasskey,
  listAllPasskeys,
  showCheckout,
  showWalletUI,
  showWalletScanner,
  logout,
}) => {
  return (
    <div className="flex-container">
      <div>
        <button onClick={getUserInfo} className="card">Get User Info</button>
      </div>
      <div>
        <button onClick={authenticateUser} className="card">Get ID Token</button>
      </div>
      <div>
        <button onClick={getAccounts} className="card">Get Accounts</button>
      </div>
      <div>
        <button onClick={getBalance} className="card">Get Balance</button>
      </div>
      <div>
        <button onClick={addChain} className="card">Add Chain</button>
      </div>
      <div>
        <button onClick={switchChain} className="card">Switch Chain</button>
      </div>
      <div>
        <button onClick={signMessage} className="card">Sign Message</button>
      </div>
      <div>
        <button onClick={sendTransaction} className="card">Send Transaction</button>
      </div>
      <div>
        <button onClick={registerPasskey} className="card">Register Passkey</button>
      </div>
      <div>
        <button onClick={listAllPasskeys} className="card">List All Passkeys</button>
      </div>
      <div>
        <button onClick={showCheckout} className="card">(Buy Crypto) Show Checkout</button>
      </div>
      <div>
        <button onClick={showWalletUI} className="card">Show Wallet UI</button>
      </div>
      <div>
        <button onClick={showWalletScanner} className="card">Show Wallet Scanner</button>
      </div>
      <div>
        <button onClick={logout} className="card">Log Out</button>
      </div>

      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </div>
  );
};

export default Dashboard;
