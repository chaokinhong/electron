const Bank = artifacts.require('Bank')
const ElectronToken = artifacts.require('ElectronToken')
const LOB = artifacts.require('LOB')

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(ElectronToken)
  const electronToken = await ElectronToken.deployed()

  await deployer.deploy(Bank)
  const bank = await Bank.deployed()

  //await electronToken.transfer(electricGenerator.address, electricGenerator.totalSupply())
  await deployer.deploy(LOB, bank.address, electronToken.address)
  const lob = await LOB.deployed(bank, electronToken)
}
