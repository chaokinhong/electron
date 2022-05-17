const ElectricGenerator = artifacts.require('ElectricGenerator')
const ElectronToken = artifacts.require('ElectronToken')
const LOB = artifacts.require('LOB')

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(ElectronToken)
  const electronToken = await ElectronToken.deployed()

  await deployer.deploy(ElectricGenerator, electronToken.address)
  const electricGenerator = await ElectricGenerator.deployed(electronToken)

  //await electronToken.transfer(electricGenerator.address, electricGenerator.totalSupply())
  await deployer.deploy(LOB, electricGenerator.address, electronToken.address)
  const lob = await LOB.deployed(electricGenerator, electronToken)
}
