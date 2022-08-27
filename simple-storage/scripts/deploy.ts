import { ethers, run, network } from "hardhat"

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()

  // We only verify on a testnet!
  if (network.config.chainId !== 31337 && process.env.ETHERSCAN_API_KEY) {
    // 6 blocks is sort of a guess
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
  }
  console.log("Simple Storage deployed to:", simpleStorage.address)

  // Get the current value
  let currentValue = await simpleStorage.retrieve()
  console.log(`Current value: ${currentValue}`)

  // Update the value
  console.log("Updating contract...")
  let transactionResponse = await simpleStorage.store(7)
  await transactionResponse.wait() // returns transaction receipt
  currentValue = await simpleStorage.retrieve()
  console.log(`Current value: ${currentValue}`)

}

const verify = async (contractAddress: string, args: any[]) => {
  console.log("Verifying contract...")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args
    })
  } catch (e: any) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!")
    } else {
      console.log(e)
    }
  }
}


main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
