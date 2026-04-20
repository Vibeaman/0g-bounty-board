const hre = require("hardhat");

async function main() {
  console.log("Deploying BountyBoard to 0G Testnet...\n");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "0G\n");

  // Deploy BountyBoard
  const BountyBoard = await hre.ethers.getContractFactory("BountyBoard");
  const bountyBoard = await BountyBoard.deploy();

  await bountyBoard.waitForDeployment();

  const address = await bountyBoard.getAddress();
  console.log("✅ BountyBoard deployed to:", address);
  console.log("\nExplorer:", `https://chainscan-galileo.0g.ai/address/${address}`);

  // Verify deployment
  const owner = await bountyBoard.owner();
  const fee = await bountyBoard.platformFee();
  
  console.log("\n--- Contract Info ---");
  console.log("Owner:", owner);
  console.log("Platform Fee:", Number(fee) / 100, "%");
  console.log("Bounty Counter:", Number(await bountyBoard.bountyCounter()));

  console.log("\n--- Next Steps ---");
  console.log("1. Update .env with BOUNTY_CONTRACT=" + address);
  console.log("2. Run the client: cd client && npm run dev");
  console.log("3. Create your first bounty!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
