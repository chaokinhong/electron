const ElectricGenerator = artifacts.require("ElectricGenerator");
const ElectronToken = artifacts.require("ElectronToken");

module.exports = async function(deployer, network, accounts) {
  //Deploy Mock DAI token
  await deployer.deploy(ElectronToken)
  const electronToken = await ElectronToken.deployed()

  //Deploy Dapp Token
  await deployer.deploy(ElectricGenerator,electronToken.address)
  const electricGenerator = await ElectricGenerator.deployed(electronToken)

  //await electronToken.transfer(electricGenerator.address, electricGenerator.totalSupply())
  
};