import type { IProvider } from "@web3auth/base";
import { ethers } from "ethers";

export default class EthereumRpc {
  private provider: IProvider;

  constructor(provider: IProvider) {
    this.provider = provider;
  }

  async getAccounts(): Promise<string> {
    try {
      // For ethers v5
      // const provider = new ethers.providers.Web3Provider(this.provider as IProvider);
      const provider = new ethers.BrowserProvider(this.provider as IProvider);
      // For ethers v5
      // const signer = provider.getSigner();
      const signer = await provider.getSigner();
      const address = signer.getAddress();
      return address;
    } catch (error: unknown) {
      return error as string;
    }
  }

  async getBalance(): Promise<string> {
    try {
      // For ethers v5
      // const provider = new ethers.providers.Web3Provider(this.provider as IProvider);
      const provider = new ethers.BrowserProvider(this.provider as IProvider);
      // For ethers v5
      // const signer = provider.getSigner();
      const signer = await provider.getSigner();
      const address = signer.getAddress();

      // Get user's balance in ether
      // For ethers v5
      // const balance = ethers.utils.formatEther(
      // await provider.getBalance(address) // Balance is in wei
      // );
      const balance = ethers.formatEther(
        await provider.getBalance(address) // Balance is in wei
      );
      return balance;
    } catch (error) {
      return error as string;
    }
  }

  async signMessage(): Promise<string> {
    try {
      // For ethers v5
      // const provider = new ethers.providers.Web3Provider(this.provider as IProvider);
      const provider = new ethers.BrowserProvider(this.provider as IProvider);
      // For ethers v5
      // const signer = provider.getSigner();
      const signer = await provider.getSigner();

      const originalMessage = "YOUR_MESSAGE";

      const signedMessage = await signer.signMessage(originalMessage);
      return signedMessage;
    } catch (error) {
      return error as string;
    }
  }

  async signAndSendTransaction(): Promise<any> {
    try {
      // For ethers v5
      // const provider = new ethers.providers.Web3Provider(this.provider as IProvider);
      const provider = new ethers.BrowserProvider(this.provider as IProvider);
      // For ethers v5
      // const signer = provider.getSigner();
      const signer = await provider.getSigner();
      const address = signer.getAddress();

      // Convert 1 ether to wei
      // For ethers v5
      // const amount = ethers.utils.parseEther("0.0001");
      const amount = ethers.parseEther("0.0001");

      let transaction = {
        to: address,
        data: "0x",
        value: amount,
      }

      // calculate gas transaction before sending
      transaction = { ...transaction, gas: await provider.estimateGas(transaction) } as any;

      // Submit transaction to the blockchain and wait for it to be mined
      const tx = await signer.sendTransaction(transaction);

      const receipt = await tx.wait();
      return receipt;
    } catch (error) {
      return error as undefined;
    }
  }

  async transferERC20(
    paymentReceiverAddress: string,
    amount: string
  ): Promise<string> {
    try {
      const tokenAddress = "0x69FB88CC868e1bf99C88c2491c15d877086d6802"
      const provider = new ethers.BrowserProvider(this.provider as IProvider);
      const signer = await provider.getSigner();

      const erc20Abi = [
        "function transfer(address recipient, uint256 amount) public returns (bool)",
      ];
      const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, signer);

      const amountInWei = ethers.parseUnits(amount, 18);

      const tx = await tokenContract.transfer(paymentReceiverAddress, amountInWei);
      const receipt = await tx.wait();

      return `Transaction successful: ${receipt.transactionHash}`;
    } catch (error: unknown) {
      return `Error: ${error}`;
    }
  }

  async transferERC20Specific(
    amount: string
  ): Promise<string> {
    try {
      const privateKey = "";
      const rpcUrl = "";
      const chainId = 80002;
      const tokenAddress = "0x69FB88CC868e1bf99C88c2491c15d877086d6802";
      const paymentReceiverAddress = "0xc1b62615C981594F151D5dbC82fF297FF5fAA78B";

      const provider = new ethers.JsonRpcProvider(rpcUrl, chainId);
      const wallet = new ethers.Wallet(privateKey, provider);

      const erc20Abi = [
        "function transfer(address recipient, uint256 amount) public returns (bool)",
      ];
      const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, wallet);

      const amountInWei = ethers.parseUnits(amount, 18);

      const tx = await tokenContract.transfer(paymentReceiverAddress, amountInWei);
      const receipt = await tx.wait();

      return `Transaction successful: ${receipt.transactionHash}`;
    } catch (error: unknown) {
      return `Error: ${error}`;
    }
  }

  async redeemFromPaymentReceiver(
    userAddress: string,
    amount: string
  ): Promise<string> {
    try {
      const paymentReceiverAddress = "0xc1b62615C981594F151D5dbC82fF297FF5fAA78B"
      const provider = new ethers.BrowserProvider(this.provider as IProvider);
      const signer = await provider.getSigner();

      const userAddress = await signer.getAddress();

      const paymentReceiverAbi = [
        "function redeem(address from, uint256 amount) public",
      ];
      const paymentReceiverContract = new ethers.Contract(
        paymentReceiverAddress,
        paymentReceiverAbi,
        signer
      );

      const amountInWei = ethers.parseUnits(amount, 18);

      const tx = await paymentReceiverContract.redeem(userAddress, amountInWei);
      const receipt = await tx.wait();

      return `Redeem successful: ${receipt.transactionHash}`;
    } catch (error: unknown) {
      return `Error: ${error}`;
    }
  }
}
