import("@nomiclabs/hardhat-waffle")
import("hardhat-gas-reporter")
// import("./tasks/block-number")
import("@nomiclabs/hardhat-etherscan")
import { task, HardhatUserConfig } from "hardhat/config"
import "./tasks/block-number"
import "dotenv/config"
import "solidity-coverage"
import "@typechain/hardhat"
import "@nomiclabs/hardhat-ethers"

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    rinkeby: {
      url: RINKEBY_RPC_URL!,
      accounts: [PRIVATE_KEY!],
      chainId: 4
    },
    localhost: {
      url: "http://1270.0.0.1:8545",
      chainId: 31337
    }
  },
  solidity: "0.8.8",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY!
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY!
  }
}

export default config