require("@nomiclabs/hardhat-ethers")
 
module.exports = {
  solidity: "0.8.17",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    fuji: {
      url: "https://quaint-green-cherry.avalanche-testnet.quiknode.pro/61620aa241785ec33ddaebbfe8ffe2e801732308/ext/bc/C/rpc/",
      accounts: ["0x99c53c9e256f8cba4e239ad8395724ab844b3dcb7fdebfdf49686d5075c961a8"],
      chainId: 43113,
    },
  },
}