import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import LandingPage from "./LandingPage";
import Select from "./Select";

// Import Single Factor Auth SDK for no redirect flow
import { ADAPTER_EVENTS, CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { PasskeysPlugin } from "@web3auth/passkeys-sfa-plugin";
import { Web3Auth, decodeToken } from "@web3auth/single-factor-auth";
import { WalletServicesPlugin } from "@web3auth/wallet-services-plugin";

import { CredentialResponse, GoogleLogin, googleLogout } from "@react-oauth/google";

// RPC libraries for blockchain calls
// import RPC from "./evm.web3";
// import RPC from "./evm.viem";
import RPC from "./evm.ethers";

import "./App.css";
import Fields1 from "./Fields1";
import Fields2 from "./Fields2";
import Loading from "./Loading";
import Upload from "./upload";
import { shouldSupportPasskey } from "./utils";
import Wallet from "./Wallet";

const verifier = "w3a-sfa-web-google";

const clientId = "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ"; // get from https://dashboard.web3auth.io

const chainConfig = {
  chainId: "0x89", // Polygon mainnet chain ID
  displayName: "Polygon Mainnet",
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  tickerName: "Polygon",
  ticker: "MATIC",
  decimals: 18,
  rpcTarget: "https://rpc.ankr.com/polygon", // RPC endpoint for Polygon
  blockExplorerUrl: "https://polygonscan.com",
  logo: "https://cryptologos.cc/logos/polygon-matic-logo.png",
};

function Login() {
  const [web3authSFAuth, setWeb3authSFAuth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [pkPlugin, setPkPlugin] = useState<PasskeysPlugin | null>(null);
  const [wsPlugin, setWsPlugin] = useState<WalletServicesPlugin | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const init = async () => {
      try {
        const ethereumPrivateKeyProvider = new EthereumPrivateKeyProvider({
          config: { chainConfig },
        });
        // Initialising Web3Auth Single Factor Auth SDK
        const web3authSfa = new Web3Auth({
          clientId, // Get your Client ID from Web3Auth Dashboard
          web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET, // ["sapphire_mainnet", "sapphire_devnet", "mainnet", "cyan", "aqua", and "testnet"]
          usePnPKey: false, // Setting this to true returns the same key as PnP Web SDK, By default, this SDK returns CoreKitKey.
          privateKeyProvider: ethereumPrivateKeyProvider,
        });
        const plugin = new PasskeysPlugin({ buildEnv: "testing" });
        web3authSfa?.addPlugin(plugin);
        setPkPlugin(plugin);
        const wsPlugin = new WalletServicesPlugin({
          walletInitOptions: {
            whiteLabel: {
              logoLight: "https://web3auth.io/images/web3auth-logo.svg",
              logoDark: "https://web3auth.io/images/web3auth-logo.svg",
            },
          },
        });
        web3authSfa?.addPlugin(wsPlugin);
        setWsPlugin(wsPlugin);
        web3authSfa.on(ADAPTER_EVENTS.CONNECTED, (data) => {
          console.log("sfa:connected", data);
          console.log("sfa:state", web3authSfa?.state);
          setProvider(web3authSfa.provider);
        });
        web3authSfa.on(ADAPTER_EVENTS.DISCONNECTED, () => {
          console.log("sfa:disconnected");
          setProvider(null);
        });
        await web3authSfa.init();
        setWeb3authSFAuth(web3authSfa);
        // (window as any).web3auth = web3authSfa;
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const onSuccess = async (response: CredentialResponse) => {
    try {
      if (!web3authSFAuth) {
        uiConsole("Web3Auth Single Factor Auth SDK not initialized yet");
        return;
      }
      setIsLoggingIn(true);
      const idToken = response.credential;
      // console.log(idToken);
      if (!idToken) {
        setIsLoggingIn(false);
        return;
      }
      const { payload } = decodeToken(idToken);
      await web3authSFAuth.connect({
        verifier,
        verifierId: (payload as any)?.email,
        idToken: idToken!,
      });
      setIsLoggingIn(false);
      // Navigate after successful login
      navigate("/select");
    } catch (err) {
      // Single Factor Auth SDK throws an error if the user has already enabled MFA
      // One can use the Web3AuthNoModal SDK to handle this case
      setIsLoggingIn(false);
      console.error(err);
    }
  };

  const loginWithPasskey = async () => {
    try {
      setIsLoggingIn(true);
      if (!pkPlugin) throw new Error("Passkey plugin not initialized");
      const result = shouldSupportPasskey();
      if (!result.isBrowserSupported) {
        uiConsole("Browser not supported");
        return;
      }
      await pkPlugin.loginWithPasskey();
      uiConsole("Passkey logged in successfully");
    } catch (error) {
      console.error((error as Error).message);
      uiConsole((error as Error).message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const getUserInfo = async () => {
    if (!web3authSFAuth) {
      uiConsole("Web3Auth Single Factor Auth SDK not initialized yet");
      return;
    }
    const getUserInfo = await web3authSFAuth.getUserInfo();
    uiConsole(getUserInfo);
  };

  const logout = async () => {
    if (!web3authSFAuth) {
      uiConsole("Web3Auth Single Factor Auth SDK not initialized yet");
      return;
    }
    googleLogout();
    web3authSFAuth.logout();
    navigate("/");
    return;
  };

  const getAccounts = async () => {
    if (!provider) {
      uiConsole("No provider found");
      return;
    }
    const rpc = new RPC(provider);
    const userAccount = await rpc.getAccounts();
    uiConsole(userAccount);
  };

  const getBalance = async () => {
    if (!provider) {
      uiConsole("No provider found");
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    uiConsole(balance);
  };

  const signMessage = async () => {
    if (!provider) {
      uiConsole("No provider found");
      return;
    }
    const rpc = new RPC(provider);
    const result = await rpc.signMessage();
    uiConsole(result);
  };

  const sendTransaction = async () => {
    if (!provider) {
      uiConsole("No provider found");
      return;
    }
    const rpc = new RPC(provider);
    const result = await rpc.signAndSendTransaction();
    uiConsole(result);
  };

  const authenticateUser = async () => {
    if (!web3authSFAuth) {
      uiConsole("Web3Auth Single Factor Auth SDK not initialized yet");
      return;
    }
    try {
      const userCredential = await web3authSFAuth.authenticateUser();
      uiConsole(userCredential);
    } catch (err) {
      uiConsole(err);
    }
  };

  const addChain = async () => {
    try {
      const newChain = {
        chainId: "0x13882",
        displayName: "Sepolia Testnet ETH",
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        rpcTarget: "https://rpc.ankr.com/polygon_amoy",
        blockExplorerUrl: "https://amoy.polygonscan.com/",
        ticker: "MATIC",
        tickerName: "MATIC",
        logo: "https://cryptologos.cc/logos/polygon-matic-logo.png",
      };
      await web3authSFAuth?.addChain(newChain);
      uiConsole("Polygon Amoy Testnet added successfully");
    } catch (err) {
      uiConsole(err);
    }
  };

  const switchChain = async () => {
    try {
      await web3authSFAuth?.switchChain({ chainId: "0x13882" });
      uiConsole("Chain switched to Polygon Amoy Testnet successfully");
    } catch (err) {
      uiConsole(err);
    }
  };

  const registerPasskey = async () => {
    try {
      if (!pkPlugin || !web3authSFAuth) {
        uiConsole("plugin not initialized yet");
        return;
      }
      const result = shouldSupportPasskey();
      if (!result.isBrowserSupported) {
        uiConsole("Browser not supported");
        return;
      }
      const userInfo = await web3authSFAuth?.getUserInfo();
      const res = await pkPlugin.registerPasskey({
        username: `google|${userInfo?.email || userInfo?.name} - ${new Date().toLocaleDateString("en-GB")}`,
      });
      if (res) uiConsole("Passkey saved successfully");
    } catch (error: unknown) {
      uiConsole((error as Error).message);
    }
  };

  const listAllPasskeys = async () => {
    if (!pkPlugin) {
      uiConsole("plugin not initialized yet");
      return;
    }
    const res = await pkPlugin.listAllPasskeys();
    uiConsole(res);
  };

  const showCheckout = async () => {
    if (!wsPlugin) {
      uiConsole("wallet services plugin not initialized yet");
      return;
    }
    await wsPlugin.showCheckout();
  };

  const showWalletUI = async () => {
    if (!wsPlugin) {
      uiConsole("wallet services plugin not initialized yet");
      return;
    }
    await wsPlugin.showWalletUi();
  };

  const showWalletScanner = async () => {
    if (!wsPlugin) {
      uiConsole("wallet services plugin not initialized yet");
      return;
    }
    await wsPlugin.showWalletConnectScanner();
  };

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  }

  const loginView = (
    <>
      <div className="flex-container">
        <div>
          <button onClick={getUserInfo} className="card">
            Get User Info
          </button>
        </div>
        <div>
          <button onClick={authenticateUser} className="card">
            Get ID Token
          </button>
        </div>
        <div>
          <button onClick={getAccounts} className="card">
            Get Accounts
          </button>
        </div>
        <div>
          <button onClick={getBalance} className="card">
            Get Balance
          </button>
        </div>
        <div>
          <button onClick={addChain} className="card">
            Add Chain
          </button>
        </div>
        <div>
          <button onClick={switchChain} className="card">
            Switch Chain
          </button>
        </div>
        <div>
          <button onClick={signMessage} className="card">
            Sign Message
          </button>
        </div>
        <div>
          <button onClick={sendTransaction} className="card">
            Send Transaction
          </button>
        </div>
        <div>
          <button onClick={registerPasskey} className="card">
            Register passkey
          </button>
        </div>
        <div>
          <button onClick={listAllPasskeys} className="card">
            List all Passkeys
          </button>
        </div>
        <div>
          <button onClick={showCheckout} className="card">
            (Buy Crypto) Show Checkout
          </button>
        </div>
        <div>
          <button onClick={showWalletUI} className="card">
            Show Wallet UI
          </button>
        </div>
        <div>
          <button onClick={showWalletScanner} className="card">
            Show Wallet Scanner
          </button>
        </div>
        <div>
          <button onClick={logout} className="card">
            Log Out
          </button>
        </div>
      </div>

      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </>
  );

  const logoutView = (
    <>
      <GoogleLogin onSuccess={onSuccess} useOneTap />
      <button onClick={loginWithPasskey} className="card passkey">
        Login with Passkey
      </button>
    </>
  );

  return (
    <>
      {isLoggingIn ? (
        <Loading />
      ) : (
        <Routes>
          <Route path="/" element={<LandingPage onSuccess={onSuccess} />} />
          <Route
            path="/select"
            element={
              <Select
                logout={logout}
              />
            }
          />
          <Route
            path="/upload"
            element={
              <Upload
                logout={logout}
              />
            }
          />
          <Route
            path="/fields1"
            element={
              <Fields1
                logout={logout}
              />
            }
          />
          <Route
            path="/fields2"
            element={
              <Fields2
                logout={logout}
              />
            }
          />
          <Route
            path="/wallet"
            element={
              <Wallet
                sendTransaction={sendTransaction}
                logout={logout}
              />
            }
          />
        </Routes>
      )}
    </>
  );
}

export default Login;
