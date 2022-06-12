const OronneToken = artifacts.require('OronneToken')
const UsdtToken = artifacts.require('UsdtToken')
const TokenFarm = artifacts.require('TokenFarm')

module.exports = async function(deployer, network, accounts) {
  // Deploy Mock DAI Token
  await deployer.deploy(UsdtToken)
  const usdtToken = await UsdtToken.deployed()

  // Deploy Dapp Token
  await deployer.deploy(OronneToken)
  const oronneToken = await OronneToken.deployed()

  // Deploy TokenFarm
  await deployer.deploy(TokenFarm, oronneToken.address, usdtToken.address)
  const tokenFarm = await TokenFarm.deployed()

  // Transfer all tokens to TokenFarm (1 million)
  await oronneToken.transfer(tokenFarm.address, '1000000000000000000000000')

  // Transfer 100 Mock DAI tokens to investor
  await usdtToken.transfer(accounts[1], '100000000000000000000')
}
