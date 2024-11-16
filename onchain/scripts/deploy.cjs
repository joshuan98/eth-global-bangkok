const hre = require("hardhat");
const { ethers, upgrades } = hre;

async function main() {

    // const ContractFactory = await ethers.getContractFactory("USDC");
    // const ContractFactory = await ethers.getContractFactory("PaymentRedemption");

    const ContractFactory = await ethers.getContractFactory("PaymentReceiver");
    const [deployerAddress] = await ethers.getSigners();
    const contract = await ContractFactory.deploy("0x3caF9D5Cd86e9a75525C16ce5B837AF3d97D0924");

    console.log("Contract deployed to:", contract.target);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
